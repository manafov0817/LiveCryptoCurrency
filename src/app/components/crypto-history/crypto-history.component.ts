import { Component } from '@angular/core';
import { CryptoHistoryService } from '../../services/crypto-history/crypto-history.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';
import { catchError, map, Observable, of } from 'rxjs';
import { ChartSettings } from '../../models/ChartSettings.model';

@Component({
  selector: 'app-crypto-history',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ChartModule,
    InputNumberModule,
    CommonModule,
  ],
  templateUrl: './crypto-history.component.html',
  styleUrl: './crypto-history.component.scss',
})
export class CryptoHistoryComponent {
  chartSettings: ChartSettings = new ChartSettings('usd', 'bitcoin', 7);

  chartData$: Observable<any> = this.cryptoHistorySvc.cryptoHistoryData$.pipe(
    map((data) => ({
      labels: data.prices.map((price: any) => new Date(price[0])),
      datasets: [
        {
          label: `${this.chartSettings.selectedCoin} price in ${this.chartSettings.selectedCurrency}`,
          data: data.prices.map((price: any) => price[1]),
          fill: false,
          borderColor: '#4bc0c0',
        },
      ],
    })),
    catchError(() => {
      alert('Please, try again later');
      return [];
    })
  );

  constructor(private cryptoHistorySvc: CryptoHistoryService) {
    cryptoHistorySvc.settingsChanged(this.chartSettings);
  }

  setDateRange(days: number): void {
    this.chartSettings.days = days;
    this.cryptoHistorySvc.settingsChanged(this.chartSettings);
  }

  dropdownChanged(event: DropdownChangeEvent, type: string): void {
    switch (type) {
      case 'curr':
        this.chartSettings.selectedCurrency = event.value;
        break;
      case 'coin':
        this.chartSettings.selectedCoin = event.value;
        break;
      default:
        console.error('Wrong type!');
    }
    this.cryptoHistorySvc.settingsChanged(this.chartSettings);
  }

  focusOut(event: any): void {
    this.setDateRange(event.target?.value);
  }

  getClass(day: number): any {
    return day == this.chartSettings.days ? 'active-button' : '';
  }

  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 4,

    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: `Price `,
        },
      },
    },
  };

  coins = [
    { label: 'Bitcoin', value: 'bitcoin' },
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Cardano', value: 'cardano' },
    { label: 'Avalanche', value: 'avalanche-2' },
    { label: 'Dogecoin', value: 'dogecoin' },
    { label: 'BNB', value: 'binancecoin' },
    { label: 'Solana', value: 'solana' },
    { label: 'Polkadot', value: 'polkadot' },
    { label: 'Ripple', value: 'ripple' },
    { label: 'Litecoin', value: 'litecoin' },
    { label: 'Chainlink', value: 'chainlink' },
    { label: 'Stellar', value: 'stellar' },
    { label: 'Polygon', value: 'matic-network' },
    { label: 'VeChain', value: 'vechain' },
    { label: 'Tron', value: 'tron' },
    { label: 'Tezos', value: 'tezos' },
    { label: 'Cosmos', value: 'cosmos' },
    { label: 'Monero', value: 'monero' },
    { label: 'EOS', value: 'eos' },
    { label: 'IOTA', value: 'iota' },
    { label: 'NEO', value: 'neo' },
    { label: 'Dash', value: 'dash' },
    { label: 'Zcash', value: 'zcash' },
  ];

  currencies = [
    { label: 'USD', value: 'usd' },
    { label: 'EUR', value: 'eur' },
    { label: 'GBP', value: 'gbp' },
    { label: 'JPY', value: 'jpy' },
    { label: 'AUD', value: 'aud' },
    { label: 'CAD', value: 'cad' },
    { label: 'CHF', value: 'chf' },
    { label: 'CNY', value: 'cny' },
    { label: 'HKD', value: 'hkd' },
    { label: 'NZD', value: 'nzd' },
    { label: 'SGD', value: 'sgd' },
    { label: 'SEK', value: 'sek' },
    { label: 'NOK', value: 'nok' },
    { label: 'MXN', value: 'mxn' },
    { label: 'INR', value: 'inr' },
    { label: 'RUB', value: 'rub' },
    { label: 'ZAR', value: 'zar' },
    { label: 'TRY', value: 'try' },
    { label: 'BRL', value: 'brl' },
    { label: 'TWD', value: 'twd' },
  ];
}
