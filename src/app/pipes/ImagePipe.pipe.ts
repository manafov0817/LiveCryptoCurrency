import { Pipe, PipeTransform } from '@angular/core';
import { CryptoTableOptions } from '../utils/CryptoTableOptions';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  cryptoDict: any = new CryptoTableOptions().productIdsDictionary;

  transform(key: string): string {
    if (!key) return key;
    key = key.replace('USDT', '').toLowerCase();
    return this.cryptoDict[key][1];
  }
}
