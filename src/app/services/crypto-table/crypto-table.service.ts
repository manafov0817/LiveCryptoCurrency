import { Injectable, OnDestroy } from '@angular/core';
import { distinctUntilChanged, map, scan, Subscription, tap } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { IPrice } from '../../models/IPrice.model';
import { HttpClient } from '@angular/common/http';
import { CoinsContainer } from '../../utils/Common/CoinsContainer';
@Injectable({
  providedIn: 'root',
})
export class CryptoTableService implements OnDestroy {
  currencySubscription: Subscription | undefined;
  currency = this.http.get<any>(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
  );
  currentProductIds: string[] = [];
  currentParameters: string[] = [];
  currencyData: any;

  constructor(private http: HttpClient) {
    this.currencySubscription = this.currency.subscribe((data) => {
      this.currencyData = data.usd;
    });
  }

  private readonly _priceUpdatesSocketSubject = new WebSocketSubject<
    any | undefined
  >('wss://stream.binance.com:9443/ws');

  private readonly priceUpdates$ =
    this._priceUpdatesSocketSubject?.asObservable();

  readonly cryptoShorNames = new CoinsContainer().coins.map(
    (coin) => coin.shortName
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
    // tap((data) => console.log(data)), // Filter out empty items
    map((data) => {
      const priceArr = [...data];
      const dummyData = { name: 'N/A', price: 0 };
      const remainingSlots = 21 - priceArr.length;
      if (remainingSlots > 0)
        priceArr.push(...Array(remainingSlots).fill(dummyData));
      return priceArr;
    }),
    distinctUntilChanged()
  );

  setProductIds(): void {
    this.currentProductIds = this.cryptoShorNames.map((key: any) => {
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

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
      this.currencySubscription = undefined;
    }
  }
}
