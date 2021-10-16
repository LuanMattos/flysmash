import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '../../core/user/user';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
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
    this.posts$ = this.postsService.posts
  }
  paginate() {
    this.postsService.paginate;
  }
}

