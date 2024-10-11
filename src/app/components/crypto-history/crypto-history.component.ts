import { Component, HostListener, ViewChild } from '@angular/core';
import { CryptoHistoryService } from '../../services/crypto-history/crypto-history.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ChartModule, UIChart } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';
import { catchError, delay, Observable, of, switchMap } from 'rxjs';
import { ChartSettings } from '../../models/ChartSettings.model';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { CryptoHistoryOptions } from '../../utils/CryptoHistoryOptions';
import { CardModule } from 'primeng/card';
import { CoinsContainer } from '../../utils/Common/CoinsContainer';

@Component({
  selector: 'app-crypto-history',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ChartModule,
    InputNumberModule,
    CommonModule,
    MessagesModule,
    CardModule,
  ],
  templateUrl: './crypto-history.component.html',
  styleUrl: './crypto-history.component.scss',
})
export class CryptoHistoryComponent {
  alertMessage: Message[] | null = null;
  readonly options = new CryptoHistoryOptions();
  readonly coinsWithValues = new CoinsContainer();
  readonly coins: any;
  windowWidth: number = 1100;
  @ViewChild('chartRef') chart: UIChart | undefined;

  readonly chartSettings: ChartSettings = new ChartSettings(
    'usd',
    'bitcoin',
    1
  );

  constructor(private cryptoHistoryService: CryptoHistoryService) {
    cryptoHistoryService.settingsChanged(this.chartSettings);
    this.coins = this.coinsWithValues.coins.map((coin) => ({
      label: coin.name,
      value: coin.label,
    }));
    this.setWindowWitdh();
  }

  readonly chartData$: Observable<any> =
    this.cryptoHistoryService.cryptoHistoryData$.pipe(
      catchError((error, caught) => {
        if (!this.alertMessage)
          this.alertMessage = [
            {
              severity: 'error',
              detail: `Please, try again after 30 seconds`,
            },
          ];
        return of(error).pipe(
          delay(5000),
          switchMap(() => caught)
        );
      })
    );

  setDateRange($event: DropdownChangeEvent): void {
    this.chartSettings.days = $event.value;
    this.cryptoHistoryService.settingsChanged(this.chartSettings);
  }

  coinsChanged($event: DropdownChangeEvent) {
    const coin = this.coinsWithValues.getCoinByLabel($event.value);

    this.chartSettings.selectedCoin = coin.label;
    this.setTooltipCoin(coin);
    this.cryptoHistoryService.settingsChanged(this.chartSettings);
  }

  currencyChanged($event: DropdownChangeEvent) {
    this.chartSettings.selectedCurrency = $event.value.shortName;
    this.setGraphCurrency($event.value.symbol);
    this.cryptoHistoryService.settingsChanged(this.chartSettings);
  }

  getClass(day: number): any {
    return day == this.chartSettings.days ? 'active-button' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.chart) this.chart.reinit();
    this.setWindowWitdh();
  }

  setWindowWitdh() {
    this.windowWidth = window.innerWidth;

    switch (true) {
      case this.windowWidth < 600:
        this.options.chartOptions.aspectRatio = 1;
        break;
      case this.windowWidth >= 600 && this.windowWidth < 900:
        this.options.chartOptions.aspectRatio = 2;
        break;
      default:
        this.options.chartOptions.aspectRatio = 2.5;
        break;
    }
  }

  setTooltipCoin(coin: any) {
    this.options.chartOptions.plugins.tooltip.callbacks.title =  ()=> {
      return `${coin.name} ${coin.shortName.toUpperCase()}`;
    };
  }

  setGraphCurrency(symbol: string) {
    this.options.chartOptions.scales.y.ticks.callback = (value: number) => {
      return `${symbol}${value.toLocaleString()}`;
    };

    this.options.chartOptions.plugins.tooltip.callbacks.label=  (tooltipItem: any)=> {
      const price = tooltipItem.raw;

      // Add the decimal point
      const decimalPart = (price % 1).toFixed(2).split('.')[1]; // Get the decimal part
      const integerPart = Math.floor(price).toString(); // Get the integer part
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        '.'
      );

      const res = `${symbol}${formattedIntegerPart}.${decimalPart}`;

      return res;
    };
  }
}
