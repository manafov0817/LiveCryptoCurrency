import { Currencies } from './Common/Currencies';
import { ChartOptions } from './Common/ChartOptions';

export class CryptoHistoryOptions {
  chartOptions = new ChartOptions().chartOptions;
  currencies = new Currencies().currencies;
  days = [
    { label: 'Today', value: 1 },
    { label: 'This Week', value: 7 },
    { label: 'This Month', value: 30 },
    { label: 'This year', value: 365 },
  ];
}
