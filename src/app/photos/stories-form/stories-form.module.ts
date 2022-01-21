import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import { QuicklinkModule } from "ngx-quicklink";
import { StoriesFormComponent } from "./stories-form.component";
import { StoriesFormRoutingModule } from "./stories-form.routing.module";
import { SwiperModule } from "swiper/angular";

@NgModule({
  declarations:[
    StoriesFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    QuicklinkModule,
    StoriesFormRoutingModule,
    SwiperModule
  ],
  exports: [
    QuicklinkModule
  ],
})
export class StoriesFormModule{

}
