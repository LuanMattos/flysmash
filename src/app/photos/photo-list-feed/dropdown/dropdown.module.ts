import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { DropdownComponent } from "./dropdown.component";
import { AlertModule } from "src/app/shared/alert/alert.module";
import {PhotoOwnerOnlyModule} from '../../../shared/directives/owner-only/photo-owner-only.module';


@NgModule({
  declarations:[
    DropdownComponent
  ],
  imports:[
    CommonModule,
    AlertModule,
    PhotoOwnerOnlyModule
  ],
  exports:[
    DropdownComponent
  ]
})
export class DropdownModule{

}
