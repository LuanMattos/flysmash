import {Component, Input, SimpleChanges} from "@angular/core";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);


@Component({
  selector:'app-modal',
  templateUrl:'modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent{

  @Input() post:Array<any> = [];

  constructor() {}
  
}
