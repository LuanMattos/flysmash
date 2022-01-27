import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import { QuicklinkModule } from "ngx-quicklink";
import { StoriesFormComponent } from "./stories-form.component";
import { StoriesFormRoutingModule } from "./stories-form.routing.module";
import { SwiperModule } from "swiper/angular";
import { ImageCropperModule } from "ngx-image-cropper";
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
    SwiperModule,
    ImageCropperModule
  ],
  exports: [
    QuicklinkModule
  ],
})
export class StoriesFormModule{

}
