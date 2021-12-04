import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../../core/user/user';
import { PostsService } from 'src/app/core/posts/posts.service';
import { ScrollService } from 'src/app/shared/scroll/scroll.service';
import { LikesService } from 'src/app/core/likes/likes.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-photo-list-feed',
  templateUrl: './photo-list-feed.component.html',
  styleUrls: ['./photo-list-feed.component.scss']
})
export class PhotoListFeedComponent implements OnInit {

  title = 'App';
  user: User;
  posts$;
  posts: Array<any> = [];
  update$ = new Subject<any>();
  showNotification$: Observable<boolean>;
  showButtonMore: boolean = true;
  
  post:[];
  avatarDefault = environment.ApiUrl + 'storage/profile_default/default.png';
  repeat = [];
  showCards: boolean;
  currentIndexComment:number;
  form: FormGroup;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private scrollService:ScrollService,
    private likeService:LikesService,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.posts;
    this.scrollService.scrollUpdate();
  }

  paginate() {
    this.postsService.paginate;
  }
  open( post ){
    this.post = post
  }
  set closeOverlayOutput(data){
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.currentIndexComment];
    if(targetElementClassList){
      targetElementClassList.classList.remove('scale-input-comment');
    }
  } 
  set setIndex($event){
    this.currentIndexComment = $event;
  }
}

