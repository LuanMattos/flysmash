import {NgModule} from "@angular/core";
import {ShowIsLoggedDirective} from "./show-is-logged.directive";


@NgModule({
  declarations:[
    ShowIsLoggedDirective
  ],
  exports:[
    ShowIsLoggedDirective
  ]
})
export class ShowIsLoggedModule {}
