import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ModalComponent } from "./modal.component";
import { SwiperModule } from "swiper/angular";
import { CommentModule } from "../comment/comment.module";
import { LikeModule } from "../like/like.module";

@NgModule({
  declarations:[
    ModalComponent
  ],
  imports:[
    CommonModule,
    SwiperModule,
    CommentModule,
    LikeModule
  ],
  exports:[
    ModalComponent
  ]

})
export class ModalModule{}
