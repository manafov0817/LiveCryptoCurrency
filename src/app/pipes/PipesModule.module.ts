import { NgModule } from '@angular/core';
import { NamePipe } from './NamePipe.pipe';
import { ImagePipe } from './ImagePipe.pipe';

@NgModule({
  declarations: [NamePipe, ImagePipe],
  exports: [NamePipe, ImagePipe], // Make sure to export it so it can be used elsewhere
})
export class PipesModule {}
