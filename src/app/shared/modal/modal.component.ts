import {Component, Input, SimpleChanges} from "@angular/core";
import SwiperCore, { Navigation } from "swiper";




@Component({
  selector:'app-modal',
  templateUrl:'modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent{

  @Input() post:Array<any> = [];

  constructor() {
    
  }
  ngOnInit(): void {
  } 
  ngAfterViewInit(): void {
    SwiperCore.use([Navigation]);
  } 
}
