import {Component,  Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

import {PhotoService} from '../../photo/photo.service';
import {Comments} from '../../comments/comments';
import {PhotoCommentsService} from './photo-comments.service';
import {UserService} from '../../../core/user/user.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-photo-comments',
  templateUrl: 'photo-comments.component.html',
  styleUrls: ['photo-comments.scss']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() comments: Comments[];
  @Input() photoId: number;
  @Input() viewComponent: boolean = false;
  @Input() allowComments;

  userName:string;
  filter:string;
  hasMore:boolean = true;
  currentPage:number = 1;
  comment:string;

  constructor(
    private userService: UserService,
    private photoCommentsService: PhotoCommentsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.photoId  = this.activatedRoute.snapshot.params.photoId;
    this.userName = this.userService.getUserName();
    this.photoCommentsService.getComments(this.photoId)
      .subscribe(response => {this.comments = response});
  }


  load(): void{
    this.photoCommentsService
      .listFromCommentsPaginated(this.photoId, this.comments.length)
      .subscribe(
        comments => {
          this.filter = '';
          this.comments = this.comments.concat(comments);
          if (!comments.length) this.hasMore = false;
        }
      );
  }
  delete( comment: Comments ): void{
    const index: number = this.comments.indexOf( comment )

    this.photoCommentsService
      .deleteComment(comment.comment_id)
      .subscribe(result => {
        (( index !== -1 ) && result ) && this.comments.splice(index, 1);
      });
  }
  edit( comment: Comments ): void{
    this.comment = comment.comment_text;
    this.photoCommentsService.comment = comment;
    this.viewComponent = !this.viewComponent;
  }

  report(): void{
    console.log('Report');
  }

}
