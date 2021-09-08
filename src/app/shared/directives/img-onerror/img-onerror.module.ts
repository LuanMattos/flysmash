import {NgModule} from '@angular/core';
import {ImgOnerrorDirective} from './img-onerror.directive';

@NgModule({
  declarations: [
    ImgOnerrorDirective
  ],
  exports: [ImgOnerrorDirective]
})
export class ImgOnerrorModule {}
