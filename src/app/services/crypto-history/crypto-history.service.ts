import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
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

  cryptoHistory$ = this.cryptoHistorySubject.asObservable();

  cryptoHistoryData$ = this.cryptoHistory$.pipe(
     switchMap((settings) => {
      const url = `${this.baseUrl}/${settings?.selectedCoin}/market_chart?vs_currency=${settings?.selectedCurrency}&days=${settings?.days}`;
      return this.http.get<any>(url);
    }),
   );

  settingsChanged(settings: ChartSettings): void {
    this.cryptoHistorySubject.next(settings);
  }
}
