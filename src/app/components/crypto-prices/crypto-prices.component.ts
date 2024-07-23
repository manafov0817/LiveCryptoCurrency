import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { IPrice } from '../../models/IPrice.model';

@Component({
  selector: 'app-crypto-prices',
  standalone: true,
  imports: [TableModule, DropdownModule, FormsModule],
  templateUrl: './crypto-prices.component.html',
  styleUrl: './crypto-prices.component.css',
})
export class CryptoPricesComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  prices: IPrice[] = [];
  selectedCurrency: string = 'USD';
  totalRecords: number = 0;
  start: number = 0;
  end: number = 10;
  loading!: boolean;
  currencies: any[] = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
  ];

  constructor(private cryptoSvc: CryptoService) {}

  ngOnInit(): void {
    this.getSubscription();
  }

  onCurrencyChange(): void {
    this.getSubscription();
  }

  getSubscription() {
    if (this.subscription) this.subscription.unsubscribe();
    this.prices = [];
    setTimeout(() => {
      this.subscription = this.cryptoSvc
        .getPriceUpdates(this.selectedCurrency, this.start, this.end)
        .subscribe((message) => {
          if (message.type == 'ticker') {
            const priceUpdate: IPrice = {
              product_id: message.product_id,
              price: Number(message.price),
            };
            const index = this.prices.findIndex(
              (p) => p.product_id == priceUpdate.product_id
            );
            if (index >= 0) this.prices[index].price = priceUpdate.price;
            else {
              this.prices.push(priceUpdate);
              this.totalRecords = this.prices.length;
            }
          }
        });
    }, 0);
    console.log(this.prices);
  }

  loadData(event: TableLazyLoadEvent) {
    this.loading = true;
    this.start = event.first != undefined ? Number(event.first) : 0;
    this.end = this.start + (event.rows != undefined ? Number(event.rows) : 0);
    this.getSubscription();
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
