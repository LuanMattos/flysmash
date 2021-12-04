import {Component, Input} from "@angular/core";
import { timeStamp } from "console";
import { PostsService } from "src/app/core/posts/posts.service";
import Swal from 'sweetalert2';
import { AlertService } from "../alert/alert.service";

@Component({
  selector:'app-dropdown-comment',
  templateUrl:'./dropdown-comment.component.html',
  styleUrls: ['./dropdown-comment.component.scss']
})
export class DropdownCommentComponent{
  @Input() comment_id;
  currentIndexComment:number;
  constructor(
    private postsService: PostsService,
    private alertService:AlertService
  ) {}

  delete() {
    Swal.fire({
      title: 'Really delete this comment? If you delete, it cannot be undone',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {     
      if (!result.isDenied) {
        this.alertService.info("Deleting your comment...",true);
        this.postsService
        .delete( this.comment_id )
        .subscribe(
          (response) => {     
            this.postsService.removePostsSubject(response);
            this.alertService.success("Comment was deleted");
          },
          err => {
           this.alertService.warning("Error try again later");
          }
        );
      }
    });
  }
  close(){
    (<HTMLElement>document.querySelector('body')).click();
    document.getElementById('overlay').style.display = 'none';
  }
  openOverlay(){
    document.getElementById('overlay').style.display = 'block';
  }
}
