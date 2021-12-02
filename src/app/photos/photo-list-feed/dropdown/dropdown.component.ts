import {Component, Input} from "@angular/core";
import { timeStamp } from "console";
import { PostsService } from "src/app/core/posts/posts.service";
import { AlertService } from "src/app/shared/alert/alert.service";
import Swal from 'sweetalert2';

@Component({
  selector:'app-dropdown',
  templateUrl:'./dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent{
  @Input() post_id;
  constructor(
    private postsService: PostsService,
    private alertService:AlertService
  ) {}

  delete() {
    return this.alertService.warning("Erro fdp")
    // Swal.fire({
    //   title: 'Really delete this post? If you delete, it cannot be undone',
    //   showDenyButton: true,
    //   confirmButtonText: 'Yes',
    //   denyButtonText: `No`,
    // }).then((result) => {
    //   this.postsService
    //   .delete( this.post_id )
    //   .subscribe(
    //     (response) => {     
    //       this.postsService.removePostsSubject(response)        
    //     },
    //     err => {
    //      this.alertService.warning("Erro fdp")
    //     }
    //   );
    // });
  }
  close(){
    (<HTMLElement>document.querySelector('body')).click();
  }
}
