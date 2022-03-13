import { CommonModule } from "@angular/common";
import {NgModule} from "@angular/core";
import { SpinnerButtonComponent } from "./spinner-button.component";

@NgModule({
  declarations:[SpinnerButtonComponent],
  exports:[SpinnerButtonComponent],
  imports: [
    CommonModule,
  ]
})
export class SpinnerButtonModule{

}
