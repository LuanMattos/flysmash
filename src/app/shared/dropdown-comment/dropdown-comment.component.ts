import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector:'app-dropdown-comment',
  templateUrl:'./dropdown-comment.component.html',
  styleUrls: ['./dropdown-comment.component.scss']
})
export class DropdownCommentComponent{
  @Input() comment_id;
  @Output() emitEvent: EventEmitter<string> = new EventEmitter<string>();
  currentIndexComment:number;
  constructor() {}

  close(){
    (<HTMLElement>document.querySelector('body')).click();
    document.getElementById('overlay').style.display = 'none';
  }
  openOverlay(){
    document.getElementById('overlay').style.display = 'block';
  }
  emittEvent( type:string ){
    this.emitEvent.emit( type );
  }
}
