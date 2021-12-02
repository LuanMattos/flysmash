import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { DropdownComponent } from "./dropdown.component";
import { AlertModule } from "src/app/shared/alert/alert.module";
@NgModule({
  declarations:[
    DropdownComponent
  ],
  imports:[
    CommonModule,
    AlertModule
  ],
  exports:[
    DropdownComponent
  ]
})
export class DropdownModule{

}
