import {NgModule} from '@angular/core';
import {ClickCardSelectedDirective} from './click-card-selected.directive';

@NgModule({
  declarations: [
    ClickCardSelectedDirective
  ],
  exports: [ClickCardSelectedDirective]
})
export class ClickCardSelectedModule {}
