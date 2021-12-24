import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { FollowingComponent } from "./following.component";
import { FollowingRoutingModule } from "./following.routing.module";
import { SpinnerService } from "src/app/shared/spinner/spinner.service";
import { QuicklinkModule } from "ngx-quicklink";


@NgModule({
  declarations:[
      FollowingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FollowingRoutingModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
})
export class FollowingModule{

}
