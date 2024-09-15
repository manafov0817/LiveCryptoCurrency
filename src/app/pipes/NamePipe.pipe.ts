import { Pipe, PipeTransform } from '@angular/core';
import { CryptoTableOptions } from '../utils/CryptoTableOptions';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  cryptoDict: any = new CryptoTableOptions().productIdsDictionary;

  transform(key: string): string {
    if (!key) return key;
    key = key.replace('USDT', '').toLowerCase();
    return this.cryptoDict[key][0];
  }
}
