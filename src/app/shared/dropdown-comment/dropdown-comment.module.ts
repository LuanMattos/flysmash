import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { DropdownCommentComponent } from "./dropdown-comment.component";
import { AlertModule } from "../alert/alert.module";
import { OverlayModule } from "../overlay/overlay.module";
@NgModule({
  declarations:[
    DropdownCommentComponent
  ],
  imports:[
    CommonModule,
    AlertModule,
    OverlayModule
  ],
  exports:[
    DropdownCommentComponent
  ]
})
export class DropdownCommentModule{

}
