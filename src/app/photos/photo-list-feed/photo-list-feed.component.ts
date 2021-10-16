import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { environment } from '../../../environments/environment';
import { User } from '../../core/user/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

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
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.posts$ = this.photoService.posts
    this.scrollUpdate();
  }

  scrollUpdate(): void {
    this.router.events.pipe(filter((e): e is Scroll => e instanceof Scroll)).subscribe(e => {
      if (e.position) {
        setTimeout(()=>{
          this.viewportScroller.scrollToPosition(e.position);
        })
      }
    });
  }
  paginate() {
    this.photoService.paginate;
  }
}

