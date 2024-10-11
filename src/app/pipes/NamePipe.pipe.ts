import { Pipe, PipeTransform } from '@angular/core';
import { CryptoTableOptions } from '../utils/CryptoTableOptions';
import { CoinsContainer } from '../utils/Common/CoinsContainer';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  coinsContainer: any = new CoinsContainer();

  transform(key: string): string {
    if (!key || key=='N/A') return key;
    const shortName = key.replace('USDT', '').toLowerCase();
    const name = this.coinsContainer.getCoinByShorName(shortName).name;
    return name;
  }
}
