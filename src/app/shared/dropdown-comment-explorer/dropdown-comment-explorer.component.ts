import {Component, EventEmitter, Input, Output} from "@angular/core";
import { AlertService } from "../alert/alert.service";

@Component({
  selector:'app-dropdown-comment-explorer',
  templateUrl:'./dropdown-comment-explorer.component.html',
  styleUrls: ['./dropdown-comment-explorer.component.scss']
})
export class DropdownCommentExplorerComponent{
  @Input() comment;
  @Output() emitEvent: EventEmitter<string> = new EventEmitter<string>();
  currentIndexComment:number;
  comments_id;
  constructor(
    private alertService:AlertService
  ) {}



  emittEvent( type:string ){
    switch(type){
      case 'edit':
        this.close();
    }
    this.emitEvent.emit( type );
  }
  open(comments_id){
    this.comments_id = comments_id;
    const targetElementClassList = document.getElementsByClassName('dropdown-number-' + comments_id.toString())[0];
    targetElementClassList.classList.add('uk-drop', 'uk-open', 'uk-drop-stack', 'uk-drop-left-top');
    this.openOverlay();
  }
  close(){
    const targetElementClassList = document.getElementsByClassName('dropdown-number-' + this.comments_id.toString())[0];
    targetElementClassList.classList.remove('uk-drop', 'uk-open', 'uk-drop-stack', 'uk-drop-left-top');
    this.closeOverlay()
  }
  openOverlay(){
    const targetElementClassList = (<HTMLElement>document.getElementsByClassName('overlay-' + this.comments_id.toString())[0]);
    targetElementClassList.style.display = 'block';
  }
  closeOverlay(){
    const targetElementClassList = (<HTMLElement>document.getElementsByClassName('overlay-' + this.comments_id.toString())[0]);
    targetElementClassList.style.display = 'none';
  }

  set closeOverlayOutput(data){
    this.close();
  } 
  share(){
    this.alertService.info('Coming soon, please wait');
  }
}
