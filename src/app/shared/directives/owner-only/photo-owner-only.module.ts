import {NgModule} from "@angular/core";
import {ItemOwnerOnlyDirective} from "./item-owner-only.directive";


@NgModule({
  declarations:[
    ItemOwnerOnlyDirective
  ],
  exports:[
    ItemOwnerOnlyDirective
  ]
})
export class PhotoOwnerOnlyModule {}
