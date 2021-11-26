import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import {Photo} from '../../photos/photo/photo';
import { Router } from '@angular/router';
import { LikesService } from 'src/app/core/likes/likes.service';
import { PostsService } from 'src/app/core/posts/posts.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit{

  @Input() post;
  // @Output() photoId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private likeService: LikesService,
    private router: Router,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
  }

  like(): void{

    this.likeService.like( this.post.posts_id ).subscribe( response => {
      if ( response ) {
          this.emitLikeUnlike( response );
        }
      }
    );
  }
  emitLikeUnlike( action ):void{
    const posts = this.postService.posts.value;
    const index =  posts.findIndex(x => x.posts_id ===  this.post.posts_id);
    const currentPost = posts[index];
    if( action == 'like' ){
      currentPost.likes_count ++;
    }else{
      currentPost.likes_count --;
    }
  }

  emitChanges(photo: Photo): void{
    // this.photoId.emit(photo.photo_id);
  }
  redirectPhotoComments(photo): void{
    this.router.navigate(['photo-comments', photo.photo_id]);
  }

}
