import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '../../core/user/user';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { PostsService } from 'src/app/core/posts/posts.service';

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
  items;

  avatarDefault = environment.ApiUrl + 'storage/profile_default/default.png';
  repeat = [];
  showCards: boolean;

  form: FormGroup;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
   this.items = [
    {
      i:'uil-share-alt mr-1',
      text:'Share',
      link:'',
    },
    {
      i:'uil-edit-alt mr-1',
      text:'Edit Post',
      link:'',
    },
    {
      i:'uil-comment-slash mr-1',
      text:'Disable comments',
      link:'',
    },
    {
      i:'uil-favorite mr-1',
      text:'Add favorites',
      link:'',
    },
    {
      i:'uil-trash-alt mr-1',
      text:'Delete',
      link:'',
      last:true
    },
  ];
    this.posts$ = this.postsService.posts
  }
  paginate() {
    this.postsService.paginate;
  }
}

