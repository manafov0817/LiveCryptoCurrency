import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { ChartSettings } from '../../models/ChartSettings.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoHistoryService {
  private baseUrl = 'https://api.coingecko.com/api/v3/coins';

  constructor(private http: HttpClient) {}

  private cryptoHistorySubject = new BehaviorSubject<ChartSettings | undefined>(
    undefined
  );
  
  private chartSettings: ChartSettings | undefined;

  cryptoHistoryData$ = this.cryptoHistorySubject.pipe(
    switchMap((settings) => {
      const url = `${this.baseUrl}/${settings?.selectedCoin}/market_chart?vs_currency=${settings?.selectedCurrency}&days=${settings?.days}`;
      return this.http.get<any>(url);
    }),
    map((data) => ({
      labels: data.prices.map((price: any) => new Date(price[0])),
      datasets: [
        {
          label:
            `${this.chartSettings?.selectedCoin} PRICE IN ${this.chartSettings?.selectedCurrency}`.toUpperCase(),
          data: data.prices.map((price: any) => price[1]),
          fill: false,
          borderColor: '#4bc0c0',
          pointRadius: 0,
        },
      ],
    }))
  );

  settingsChanged(settings: ChartSettings): void {
    this.chartSettings = { ...this.chartSettings, ...settings };
    this.cryptoHistorySubject.next(settings);
  }
}
