import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import {Photo} from '../../photos/photo/photo';
import { Router } from '@angular/router';
import { LikesService } from 'src/app/core/likes/likes.service';
import { PostsService } from 'src/app/core/posts/posts.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit{

  @Input() post;
  @Input() module;
  // @Output() photoId: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private likeService: LikesService,
    private router: Router,
    private postService: PostsService,
    private userService: UserService
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
    if(this.module == 'explorer'){
      this.emitExplorer( action );
    }else{
      this.emitDefault( action );
    }
  }
  emitDefault(action){
    const posts = this.postService.posts.value;
    const index =  posts.findIndex(x => x.posts_id ===  this.post.posts_id);
    const currentPost = posts[index];
    if( action == 'like' ){
      currentPost.likes_count ++;
      currentPost.liked = true;
    }else{
      currentPost.likes_count --;
      currentPost.liked = false;
    }
  }
  emitExplorer(action){
    const postsExplorer = this.postService.postsExplorer.value;
    const index =  postsExplorer.findIndex(x => x.posts_id ===  this.post.posts_id);
    const currentPostExplorer = postsExplorer[index];
    if( action == 'like' ){
      currentPostExplorer.likes_count ++;
      currentPostExplorer.liked = true;
    }else{
      currentPostExplorer.likes_count --;
      currentPostExplorer.liked = false;
    }
  }

  emitChanges(photo: Photo): void{
    // this.photoId.emit(photo.photo_id);
  }
  redirectPhotoComments(photo): void{
    this.router.navigate(['photo-comments', photo.photo_id]);
  }
  isLogged(): boolean{
    return this.userService.isLogged();
  }

}
