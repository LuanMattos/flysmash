import {Component, Input} from "@angular/core";

@Component({
  selector:'app-dropdown',
  templateUrl:'./dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent{
  @Input() items;
  constructor(
  ) {}

  openCloseDropdown(el){
    console.log(el.target.querySelector('.dropdown-modal'))
  }
  close(){
    (<HTMLElement>document.querySelector('body')).click();
  }
}
