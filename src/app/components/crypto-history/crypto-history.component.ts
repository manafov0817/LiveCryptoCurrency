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
  ],
  templateUrl: './crypto-history.component.html',
  styleUrl: './crypto-history.component.scss',
})
export class CryptoHistoryComponent {
  alertMessage: Message[] | null = null;
  readonly options = new CryptoHistoryOptions();

  private readonly chartSettings: ChartSettings = new ChartSettings(
    'usd',
    'bitcoin',
    7
  );

  constructor(private cryptoHistoryService: CryptoHistoryService) {
    cryptoHistoryService.settingsChanged(this.chartSettings);
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

  setDateRange(days: number): void {
    this.chartSettings.days = days;
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
    this.chartSettings.selectedCurrency = $event.value;
    this.cryptoHistoryService.settingsChanged(this.chartSettings);
  }

  getClass(day: number): any {
    return day == this.chartSettings.days ? 'active-button' : '';
  }
}
