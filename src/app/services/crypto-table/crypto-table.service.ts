import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root',
})
export class CryptoTableService {
  private _socketSubject = new WebSocketSubject<any | undefined>(
    'wss://ws-feed.pro.coinbase.com'
  );

  _socketObservable$ = this._socketSubject?.asObservable();

  changeOptions(productIds: string[]) {
    // First Unsubscribe for changing parameters
    this.applySetttings();
    // Subscribe again to get data
    this.applySetttings(productIds);
  }

  applySetttings(prodIds: string[] = []) {
    this._socketSubject.next({
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
