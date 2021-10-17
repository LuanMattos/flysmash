import { HttpEvent, HttpEventType } from "@angular/common/http";
import {Component, Input} from "@angular/core";
import { PostsService } from "src/app/core/posts/posts.service";

@Component({
  selector:'app-dropdown',
  templateUrl:'./dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent{
  @Input() post_id;
  constructor(
    private postsService: PostsService
  ) {}

  delete() {
    this.postsService
    .delete( this.post_id )
    .subscribe(
      (event) => {     
        this.postsService.removePostsSubject(event)        
      },
      err => {
       
      }
    );
  }
  close(){
    (<HTMLElement>document.querySelector('body')).click();
  }
}
