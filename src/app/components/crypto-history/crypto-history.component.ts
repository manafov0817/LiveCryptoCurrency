import { Component, OnInit } from '@angular/core';
import { CryptoHistoryService } from '../../services/crypto-history.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';

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
export class CryptoHistoryComponent implements OnInit {
 
  selectedCurrency: string = 'usd';
  selectedCoin: string = 'bitcoin';
  days: number = 7;
  chartData: any;
  chartOptions: any;
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

  constructor(private cryptoHistorySvc: CryptoHistoryService) {}

  ngOnInit(): void {
    this.fetchHistoricalData();
    this.initializeChartOptions();
  }

  fetchHistoricalData(): void {
    this.cryptoHistorySvc
      .getCryptoData(this.selectedCoin, this.selectedCurrency, this.days)
      .subscribe({
        next: (data) => {
          this.chartData = {
            labels: data.prices.map((price: any) => new Date(price[0])),
            datasets: [
              {
                label: `${this.selectedCoin} price in ${this.selectedCurrency}`,
                data: data.prices.map((price: any) => price[1]),
                fill: false,
                borderColor: '#4bc0c0',
              },
            ],
          };
        },
        error: (err) => {
          alert('Please, try again later');
        },
      });
  }
  setDateRange(days: number): void {
    this.days = days;
    this.fetchHistoricalData();
  }
  getClass(day: number): any {
    return day == this.days ? 'active-button' : '';
  }
  initializeChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 4, // You can adjust this value based on your needs

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
            text: `Price (${this.selectedCurrency})`,
          },
        },
      },
    };
  }

  focusOut(event: any): void {
    setTimeout(() => {
      this.fetchHistoricalData();
    }, 500);
  }
}
