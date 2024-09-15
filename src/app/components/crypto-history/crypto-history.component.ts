import { Component, HostListener } from '@angular/core';
import { CryptoHistoryService } from '../../services/crypto-history/crypto-history.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';
import { catchError, delay, Observable, of, switchMap } from 'rxjs';
import { ChartSettings } from '../../models/ChartSettings.model';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { CryptoHistoryOptions } from '../../utils/CryptoHistoryOptions';
import { CardModule } from 'primeng/card';

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
  windowWidth: number = 1100;
  readonly chartSettings: ChartSettings = new ChartSettings(
    'usd',
    'bitcoin',
    7
  );

  constructor(private cryptoHistoryService: CryptoHistoryService) {
    cryptoHistoryService.settingsChanged(this.chartSettings);
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
          delay(30000),
          switchMap(() => caught)
        );
      })
    );

  setDateRange($event: DropdownChangeEvent): void {
    this.chartSettings.days = $event.value;
    this.cryptoHistoryService.settingsChanged(this.chartSettings);
  }

  focusOut(event: any): void {
    this.setDateRange(event.target?.value);
  }

  coinsChanged($event: DropdownChangeEvent) {
    this.chartSettings.selectedCoin = $event.value;
    this.cryptoHistoryService.settingsChanged(this.chartSettings);
  }
  currencyChanged($event: DropdownChangeEvent) {
    console.log($event);
    this.chartSettings.selectedCurrency = $event.value;
    this.cryptoHistoryService.settingsChanged(this.chartSettings);
  }

  getClass(day: number): any {
    return day == this.chartSettings.days ? 'active-button' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
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
}
