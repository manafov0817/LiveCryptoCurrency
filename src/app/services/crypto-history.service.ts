import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoHistoryService {
  private baseUrl = 'https://api.coingecko.com/api/v3/coins';
  constructor(private http: HttpClient) {}

  getCryptoData(
    coin: string,
    currency: string,
    days: number = 120
  ): Observable<any> {
    const url = `${this.baseUrl}/${coin}/market_chart?vs_currency=${currency}&days=${days}`;
    return this.http.get<any>(url);
  }
}
