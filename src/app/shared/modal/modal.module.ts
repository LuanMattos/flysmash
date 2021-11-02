import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ModalComponent } from "./modal.component";
import { SwiperModule } from "swiper/angular";

@NgModule({
  declarations:[
    ModalComponent
  ],
  imports:[
    CommonModule,
    SwiperModule
  ],
  exports:[
    ModalComponent
  ]

})
export class ModalModule{}
