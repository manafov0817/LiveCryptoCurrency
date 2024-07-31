import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private _socketSubject: WebSocketSubject<any> | null =
    new WebSocketSubject<any>('wss://ws-feed.pro.coinbase.com');
  private _subscription: Subscription | null = null;

  constructor() {}

  stop(): void {
    if (this._subscription == null) {
      return;
    }
    this._subscription.unsubscribe();
    this._subscription = null;
    this._socketSubject?.complete();
    this._socketSubject = null;
  }

  getAll(currency: string, skip: number, take: number): Observable<any> {
    this.stop();

    this._socketSubject = webSocket('wss://ws-feed.pro.coinbase.com');
    
    this._subscription = this._socketSubject.subscribe();

    const product_ids = [
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
    ].slice(skip, skip + take);

    this._socketSubject.next({
      type: 'subscribe',
      channels: [
        {
          name: 'ticker',
          product_ids: product_ids,
        },
      ],
    });

    return this._socketSubject
      .asObservable()
      .pipe(tap((data) => console.log(data)));
  }
}
