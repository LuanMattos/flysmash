import {Component, Input} from '@angular/core';
import { timeStamp } from 'console';
import { PostsService } from 'src/app/core/posts/posts.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
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
    Swal.fire({
      title: 'Really delete this post? If you delete, it cannot be undone',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      console.log(result.isConfirmed)
      if (result.isConfirmed) {
        this.alertService.info('Deleting your post...',true);
        this.postsService
        .delete( this.post_id )
        .subscribe(
          (response) => {     
            this.postsService.removePostsSubject( response );
            this.alertService.success('ost was deleted');
            this.close();
          },
          err => {
           this.alertService.warning('Error try again later');
           this.close();
          }
        );
      }else{
        this.close();
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
