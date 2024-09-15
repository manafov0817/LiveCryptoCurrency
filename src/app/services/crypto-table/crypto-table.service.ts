import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  scan,
  Subscription,
  tap,
} from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { IPrice } from '../../models/IPrice.model';
import { CryptoTableOptions } from '../../utils/CryptoTableOptions';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CryptoTableService implements OnDestroy {
  private readonly _priceUpdatesSocketSubject = new WebSocketSubject<
    any | undefined
  >('wss://stream.binance.com:9443/ws');

  currencySubscription: Subscription | undefined;

  currency = this.http.get<any>(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
  );

  private readonly priceUpdates$ =
    this._priceUpdatesSocketSubject?.asObservable();

  currentProductIds: string[] = [];
  currentParameters: string[] = [];

  currencyData: any;

  constructor(private http: HttpClient) {
    this.currencySubscription = this.currency.subscribe((data) => {
      this.currencyData = data.usd;
    });
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
      this.currencySubscription = undefined;
    }
  }

  readonly cryptoTableKeys = Object.keys(
    new CryptoTableOptions().productIdsDictionary
  );

  readonly cryptoTicker$ = this.priceUpdates$.pipe(
    map(
      (message) =>
        <IPrice>{
          name: message.s,
          price: Number(message.p),
        }
    ),
    scan((acc, item) => {
      const index = acc.findIndex((i) => i.name === item.name);
      if (index === -1) {
        return [...acc, item];
      } else {
        acc[index] = item;
        return [...acc];
      }
    }, <IPrice[]>[]),
    map((cryptos) => cryptos.filter((crypto) => crypto.name != undefined)),
    distinctUntilChanged()
  );

  setProductIds(): void {
    this.currentProductIds = this.cryptoTableKeys.map((key) => {
      return `${key.toUpperCase()}USDT`;
    });

    this.currentParameters = this.currentProductIds.map((key) => {
      return key.toLowerCase() + '@aggTrade';
    });
    this.applySetttings();
  }

  applySetttings() {
    this._priceUpdatesSocketSubject.next({
      method: 'SUBSCRIBE',
      params: this.currentParameters,
      id: 1,
    });
  }
}
