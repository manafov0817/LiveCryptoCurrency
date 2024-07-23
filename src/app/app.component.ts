import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoPricesComponent } from './components/crypto-prices/crypto-prices.component';
import { CryptoHistoryComponent } from './components/crypto-history/crypto-history.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CryptoPricesComponent, CryptoHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crypto-tracker';
}
