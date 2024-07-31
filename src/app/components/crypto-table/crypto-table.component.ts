import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CryptoTableService } from '../../services/crypto-table/crypto-table.service';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, filter, map, scan, tap } from 'rxjs';
import { IPrice } from '../../models/IPrice.model';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

class TableEvent {
  constructor(
    public currency: string = 'USD',
    public skip: number = 0,
    public take: number = 10
  ) {}
}

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [AsyncPipe, TableModule, CommonModule, DropdownModule, FormsModule],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss',
})
export class CryptoTableComponent {
  tableEvent: TableEvent = new TableEvent();
  currProductIds: string[] = [];

  constructor(private cryptoTableSvc: CryptoTableService) {
    this.tableEvent = new TableEvent('USD', 0, 5);
    this.setProductIds();
  }

  priceTicker$ = this.cryptoTableSvc._socketObservable$.pipe(
    filter((message) => message.type === 'ticker'),
    map(
      (message) =>
        <IPrice>{
          product_id: message.product_id,
          price: Number(message.price),
        }
    )
  );

  priceUpdates$ = this.priceTicker$.pipe(
    // tap((data) => console.log(data)),
    scan((acc, item) => {
      const index = acc.findIndex((i) => i.product_id === item.product_id);

      if (index === -1) {
        return [...acc, item];
      } else {
        acc[index] = item;
        return [...acc];
      }
    }, <IPrice[]>[]),
    map((prices) =>
      prices.filter(
        (price) =>
          price.product_id != undefined &&
          this.currProductIds.indexOf(price.product_id) >= 0
      )
    ),
    tap((data) => data),
    distinctUntilChanged()
  );

  loadData(event: TableLazyLoadEvent) {
    this.tableEvent.skip = event.first != undefined ? event.first : 0;
    this.tableEvent.take = event.rows != undefined ? event.rows : 0;
    this.setProductIds();
  }

  currencyChanged(event: DropdownChangeEvent): void {
    this.tableEvent.currency = event.value;
    this.setProductIds();
  }

  readonly currencies: any[] = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
  ];

  setProductIds(): void {
    const tableEvent = this.tableEvent;
    const prodIds = [
      `BTC-${tableEvent.currency}`,
      `XLM-${tableEvent.currency}`,
      `APT-${tableEvent.currency}`,
      `FET-${tableEvent.currency}`,
      `ETH-${tableEvent.currency}`,
      `USDT-${tableEvent.currency}`,
      `XRP-${tableEvent.currency}`,
      `ADA-${tableEvent.currency}`,
      `DOGE-${tableEvent.currency}`,
      `SOL-${tableEvent.currency}`,
      `DOT-${tableEvent.currency}`,
      `SHIB-${tableEvent.currency}`,
      `LTC-${tableEvent.currency}`,
      `AVAX-${tableEvent.currency}`,
      `ATOM-${tableEvent.currency}`,
      `LINK-${tableEvent.currency}`,
      `ETC-${tableEvent.currency}`,
      `BCH-${tableEvent.currency}`,
      `MATIC-${tableEvent.currency}`,
    ].slice(tableEvent.skip, tableEvent.skip + tableEvent.take);
    this.currProductIds = prodIds;
    this.cryptoTableSvc.changeOptions(prodIds);
  }
}
