import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  filter,
  switchMap,
  map,
  scan,
  distinctUntilChanged,
  startWith,
  tap,
} from 'rxjs/operators';
import { CryptoService } from '../../services/crypto/crypto.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { IPrice } from '../../models/IPrice.model';

///
class TableLoadEvent {
  constructor(readonly skip: number = 0, readonly take: number = 10) {}
}

@Component({
  selector: 'app-crypto-prices',
  standalone: true,
  imports: [TableModule, DropdownModule, FormsModule, CommonModule],
  templateUrl: './crypto-prices.component.html',
  styleUrl: './crypto-prices.component.scss',
})
export class CryptoPricesComponent {
  constructor(private readonly _cryptoService: CryptoService) {}

  private readonly _selectedCurrencySubject = new BehaviorSubject<string>(
    'USD'
  );

  set selectedCurrency(value: string) {
    this._selectedCurrencySubject.next(value);
  }
  get selectedCurrency(): string {
    return this._selectedCurrencySubject.value;
  }

  private readonly _selectedCurrency$ = this._selectedCurrencySubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private readonly _tableLoadSubject = new BehaviorSubject<TableLoadEvent>(
    new TableLoadEvent()
  );
  private readonly _tableLoad$ = this._tableLoadSubject.asObservable();

  private readonly _priceSettingsChanged$ = combineLatest([
    this._selectedCurrency$,
    this._tableLoad$,
  ]);

  private readonly _priceTicker$ = this._priceSettingsChanged$.pipe(
    switchMap(([selectedCurrency, tableLoad]) => {
      return this._cryptoService.getAll(
        selectedCurrency,
        tableLoad.skip,
        tableLoad.take
      );
    }),
    filter((message) => message.type === 'ticker'),
    map(
      (message) =>
        <IPrice>{
          product_id: message.product_id,
          price: Number(message.price),
        }
    )
    ,
    tap(data=>data)
  );

  private readonly _pricesUpdates$ = this._priceTicker$.pipe(
    scan((acc, item) => {
      const index = acc.findIndex((i) => i.product_id === item.product_id);
      if (index === -1) {
        // Insert new item
        return [...acc, item];
      } else {
        // Update existing item
        acc[index] = item;
        return [...acc];
      }
    }, <IPrice[]>[]),
    distinctUntilChanged()
  );

  readonly prices$ = this._priceSettingsChanged$.pipe(
    startWith([]),
    switchMap(() => this._pricesUpdates$)
  );

  readonly totalRecords$ = this.prices$.pipe(map((prices) => prices.length));
  readonly currencies: any[] = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
  ];

  loadData(event: TableLazyLoadEvent) {
    this._tableLoadSubject.next(
      new TableLoadEvent(event.first || 0, event.rows || 10)
    );
  }
}
