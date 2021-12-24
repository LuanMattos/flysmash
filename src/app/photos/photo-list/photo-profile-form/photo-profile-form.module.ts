import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {ImageCropperModule} from "ngx-image-cropper";
import { SwiperModule } from 'swiper/angular';
import { BackHistoryModule } from "src/app/shared/directives/back-history/back-history.module";
import { VmessageModule } from "src/app/shared/vmessage/vmessage.module";
import { PhotoModule } from "../../photo/photo.module";
import { UxModule } from "src/app/core/ux/ux-module";
import { DarkenOnHoverModule } from "src/app/shared/directives/dark-on-hover/darken-on-hover.module";
import { ClickCardSelectedModule } from "src/app/shared/directives/click-card-selected/click-card-selected.module";
import { PhotoProfileFormComponent } from "./photo-profile-form.component";
import { PhotoProfileFormRoutingModule } from "./photo-profile-form.routing.module";
import { QuicklinkModule } from "ngx-quicklink";
import { SpinnerService } from "src/app/shared/spinner/spinner.service";

@NgModule({
  declarations:[
    PhotoProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VmessageModule,
    FormsModule,
    RouterModule,
    PhotoModule,
    UxModule,
    DarkenOnHoverModule,
    ImageCropperModule,
    SwiperModule,
    ClickCardSelectedModule,
    BackHistoryModule,
    PhotoProfileFormRoutingModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
})
export class PhotoProfileFormModule{

}
