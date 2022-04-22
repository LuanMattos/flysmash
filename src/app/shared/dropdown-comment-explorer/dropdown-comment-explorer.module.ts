import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AlertModule } from "../alert/alert.module";
import { OverlayModule } from "../overlay/overlay.module";
import { DropdownCommentExplorerComponent } from "./dropdown-comment-explorer.component";
import { PhotoOwnerOnlyModule } from "../directives/owner-only/photo-owner-only.module";
@NgModule({
  declarations:[
    DropdownCommentExplorerComponent
  ],
  imports:[
    CommonModule,
    AlertModule,
    OverlayModule,
    PhotoOwnerOnlyModule
  ],
  exports:[
    DropdownCommentExplorerComponent
  ]
})
export class DropdownCommentExplorerModule{

}
