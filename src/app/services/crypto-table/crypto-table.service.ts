import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, scan } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { IPrice } from '../../models/IPrice.model';
import { TableEvent } from '../../models/TableEvent.model';
import { CryptoTableOptions } from '../../Utils/CryptoTableOptions';
@Injectable({
  providedIn: 'root',
})
export class CryptoTableService {
  private readonly _priceUpdatesSocketSubject = new WebSocketSubject<
    any | undefined
  >('wss://ws-feed.pro.coinbase.com');

  private readonly priceUpdates$ =
    this._priceUpdatesSocketSubject?.asObservable();
  currentProductIds: string[] = [];
  readonly cryptoTableOptions = new CryptoTableOptions();

  readonly priceTicker$ = this.priceUpdates$.pipe(
    filter((message) => message.type === 'ticker'),
    map(
      (message) =>
        <IPrice>{
          product_id: message.product_id,
          price: Number(message.price),
        }
    ),
    scan((acc, item) => {
      const index = acc.findIndex((i) => i.product_id === item.product_id);
      if (index === -1) {
        return [...acc, item];
      } else {
        acc[index] = item;
        return [...acc];
      }
    }, <IPrice[]>[]),
    map((prices) =>
      prices.filter(
        (price) =>
          price.product_id != undefined &&
          this.currentProductIds.indexOf(price.product_id) >= 0
      )
    ),
    distinctUntilChanged()
  );

  setProductIds(tableEvent: TableEvent): void {
    this.currentProductIds = this.cryptoTableOptions.productIds
      .slice(tableEvent.skip, tableEvent.skip + tableEvent.take)
      .map((id) => {
        return id.replace('CURRENCY', tableEvent.currency);
      });
    this.changeOptions();
  }

  changeOptions() {
    // First Unsubscribe for changing parameters
    this.applySetttings();
    // Subscribe again to get data
    this.applySetttings(this.currentProductIds);
  }

  applySetttings(prodIds: string[] = []) {
    this._priceUpdatesSocketSubject.next({
      type: prodIds.length > 0 ? 'subscribe' : 'unsubscribe',
      channels: [
        {
          name: 'ticker',
          product_ids: prodIds,
        },
      ],
    });
  }
}
