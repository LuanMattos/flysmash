import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { FollowersComponent } from "./followers.component";
import { FollowersRoutingModule } from "./followers.routing.module";


@NgModule({
  declarations:[
      FollowersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FollowersRoutingModule
  ]
})
export class FollowersModule{

}
