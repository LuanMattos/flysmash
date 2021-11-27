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
    private likeService:LikesService
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
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.currentIndexComment].classList;
    targetElementClassList.remove('scale-input-comment')
  }

  commentScale( i ):void{
    this.currentIndexComment = i;
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[i].classList;
    targetElementClassList.add('scale-input-comment')
    document.getElementById('close-overlay').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }
  closeCommentScale():void{
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.currentIndexComment].classList;
    targetElementClassList.remove('scale-input-comment');
    document.getElementById('close-overlay').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }
  showSpinnerSend(){
    const iconSend = document.getElementsByClassName('icon-feather-send')[this.currentIndexComment].classList;
    const spanSpinner = document.getElementsByClassName('span-spinner')[this.currentIndexComment].classList;
    iconSend.add('d-none');
    spanSpinner.remove('d-none');
  }
  hideSpinnerSend(){
    const iconSend = document.getElementsByClassName('icon-feather-send')[this.currentIndexComment].classList;
    const spanSpinner = document.getElementsByClassName('span-spinner')[this.currentIndexComment].classList;
    iconSend.remove('d-none');
    spanSpinner.add('d-none');
  }
  sendComment():void{
    this.showSpinnerSend();
    setTimeout(()=>{
      this.closeCommentScale();
      this.hideSpinnerSend();
    },2000)
  }
}

