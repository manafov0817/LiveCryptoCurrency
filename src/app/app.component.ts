import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoPricesComponent } from './components/crypto-prices/crypto-prices.component';
import { CryptoHistoryComponent } from './components/crypto-history/crypto-history.component';
import { CryptoTableComponent } from './components/crypto-table/crypto-table.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CryptoPricesComponent,
    CryptoHistoryComponent,
    CryptoTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'crypto-tracker';
}
