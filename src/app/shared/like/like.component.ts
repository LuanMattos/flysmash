import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import {UserService} from '../../core/user/user.service';
import {PhotoService} from '../../photos/photo/photo.service';
import {Photo} from '../../photos/photo/photo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit{

  @Input() photo:Photo;
  @Input() _viewFormComment: boolean = false;
  @Output() viewFormComment: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() photoId: EventEmitter<number> = new EventEmitter<number>();
  userId: number;

  constructor(
    private userService: UserService,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(response => this.userId = response?.user_id)
  }

     // return this.photo.map(function(e) { return e.user_id; }).indexOf(this.userId.toString()) !== -1;

  like( photoId: number ): void{

    if (this.photo.liked){
      this.photo.liked = false;
    }else{
      this.photo.liked = true;
    }

    const userName = this.userService.getUserName();
    this.photoService
      .like( photoId, userName )
      .subscribe(response => {
        if (response) {
          this.photo.photo_likes = response.count;
          // this.photo.liked = response.liked;
          }
        }
      );
  }

  emitChanges(photo: Photo): void{
    this.viewFormComment.emit(!this._viewFormComment);
    this.photoId.emit(photo.photo_id);
  }
  redirectPhotoComments(photo): void{
    this.router.navigate(['photo-comments', photo.photo_id]);
  }

}
