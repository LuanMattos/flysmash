import {NgModule} from "@angular/core";
import { BackHistoryDirective } from "./back-history.directive";


@NgModule({
  declarations:[
    BackHistoryDirective
  ],
  exports:[
    BackHistoryDirective
  ]
})
export class BackHistoryModule {}
