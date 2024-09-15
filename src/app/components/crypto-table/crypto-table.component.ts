import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CryptoTableService } from '../../services/crypto-table/crypto-table.service';
import { CommonModule } from '@angular/common';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CryptoTableOptions } from '../../utils/CryptoTableOptions';
import { PipesModule } from '../../pipes/PipesModule.module';

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [
    PipesModule,
    AsyncPipe,
    TableModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    CardModule,
  ],
  templateUrl: './crypto-table.component.html',
  styleUrl: './crypto-table.component.scss',
})
export class CryptoTableComponent {
  selectedCurrency: string = 'USD';
  cryptoRate = 1;
  cryptos$ = this.cryptoTableService.cryptoTicker$;
  readonly cryptoTableOptions = new CryptoTableOptions();

  constructor(private cryptoTableService: CryptoTableService) {
    this.cryptoTableService.setProductIds();
  }

  currencyChanged($event: DropdownChangeEvent) {
    if ($event.value != null) this.selectedCurrency = $event.value;
    this.cryptoRate =
      this.cryptoTableService.currencyData[$event.value.toLowerCase()];
  }
}
