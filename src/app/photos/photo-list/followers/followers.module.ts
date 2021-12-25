import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { FollowersComponent } from "./followers.component";
import { FollowersRoutingModule } from "./followers.routing.module";
import { SpinnerService } from "src/app/shared/spinner/spinner.service";
import { QuicklinkModule } from "ngx-quicklink";


@NgModule({
  declarations:[
      FollowersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    QuicklinkModule,
    FollowersRoutingModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
})
export class FollowersModule{

}
