import { Pipe, PipeTransform } from '@angular/core';
import { CryptoTableOptions } from '../utils/CryptoTableOptions';
import { CoinsContainer } from '../utils/Common/CoinsContainer';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  private readonly coinsContainer = new CoinsContainer();

  transform(key: string): string {
    if (!key || key == 'N/A') return key;

    const shortName = key.replace('USDT', '').toLowerCase();
    const imageUrl = this.coinsContainer.getCoinByShorName(shortName).imageLink;
    return imageUrl;
  }
}
