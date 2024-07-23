import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private socket$: Subject<any>;
  constructor() {
    this.socket$ = webSocket('wss://ws-feed.pro.coinbase.com');
  }

  getPriceUpdates(
    currency: string,
    start: number,
    end: number
  ): Observable<any> {
    this.socket$.next({
      type: 'subscribe',
      channels: [
        {
          name: 'ticker',
          product_ids: [
            `BTC-${currency}`,
            `XLM-${currency}`,
            `APT-${currency}`,
            `FET-${currency}`,
            `ETH-${currency}`,
            `USDT-${currency}`,
            `XRP-${currency}`,
            `ADA-${currency}`,
            `DOGE-${currency}`,
            `SOL-${currency}`,
            `DOT-${currency}`,
            `SHIB-${currency}`,
            `LTC-${currency}`,
            `AVAX-${currency}`,
            `ATOM-${currency}`,
            `LINK-${currency}`,
            `ETC-${currency}`,
            `BCH-${currency}`,
            `MATIC-${currency}`,
          ].slice(start, end),
        },
      ],
    });

    return this.socket$.asObservable();
  }
}
