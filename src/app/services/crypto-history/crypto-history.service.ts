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
          label:'',
          data: data.prices.map((price: any) => price[1]),
          pointRadius: 0,
          borderColor: 'rgb(44, 200, 105)',  // Set the line color

          backgroundColor: (context: any) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
    
            if (!chartArea) {
              return null;
            }
    
            // Create a gradient for the fill
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(44, 200, 105, 0.4)'); // Match the RGB value for consistency
            gradient.addColorStop(1, 'rgba(44, 200, 105, 0)');
    
            return gradient;
          },
          fill: 'start',  // Enables the fading under the line
          tension: 0.4,   // Makes the line smooth
        },
      ],
    }))
  );

  settingsChanged(settings: ChartSettings): void {
    this.chartSettings = { ...this.chartSettings, ...settings };
    this.cryptoHistorySubject.next(settings);
  }
}
