import {Component, Input, SimpleChanges} from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
import SwiperCore, { Navigation } from "swiper";




@Component({
  selector:'app-modal',
  templateUrl:'modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent{

  @Input() post:Array<any> = [];

  constructor(
    private userService:UserService
  ) {
    
  }
  ngOnInit(): void {
  } 
  ngAfterViewInit(): void {
    SwiperCore.use([Navigation]);
  } 
  isLogged():any{
    return this.userService.isLogged();
  }
}
