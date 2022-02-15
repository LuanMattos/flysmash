import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PhotoService} from '../photo/photo.service';
import {environment} from '../../../environments/environment';
import {User} from '../../core/user/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/user/user.service';
import { PostsService } from 'src/app/core/posts/posts.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit, AfterViewInit {

  title = 'Profile';
  photos = [];
  post:[];
  canLoad = false;
  $user;
  stoppedRequest: boolean;
  isExplorer: boolean;
  isTimeline: boolean;
  repeat = [];
  isLogged;
  posts$;
  postModal: Array<any> = [];
  userName;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private postsService: PostsService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void{
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.form = this.formBuilder.group({});
    this.$user = this.userService.getDataUser(null);
    this.isLogged = this.userService.isLogged();
   
    const isLogged = this.userService.isLogged();
    
    this.posts$ = isLogged?this.postsService.posts:this.postsService.requestPostsPublic(this.userName);
  }
  ngAfterViewInit(): void{
    // Trocar toda funcao de scroll por carregamento lento
    // const observerPhotoList = new IntersectionObserver((entries) => {
    //   entries.forEach(entry => {
    //     const {isIntersecting, intersectionRatio} = entry;
    //     if (isIntersecting || intersectionRatio > 0 ) {
    //     }else{
    //       // observador.unobserve(entry.target);
    //     }
    //   });
    // }, {
    //   threshold: [0, 1],
    //   rootMargin: '0px'
    // });
    // observerPhotoList.observe(  document.querySelector('.photos'));
  }

  // load(): any{
  //   if (!this.isExplorer && !this.isTimeline) {
  //     if (!this.stoppedRequest) {
  //       this.photoService
  //         .listFromUserPaginated(this.user.users_name, this.photos.length)
  //         .subscribe(res => {
  //           this.stoppedRequest = false;
  //           if (res && !res.length) {
  //             this.stoppedRequest = true;
  //           }
  //           this.pushPhotos( res );
  //         });
  //     }
  //   }else if (this.isTimeline){
  //     this.photoService
  //       .listFromTimelinePaginated(this.photos.length)
  //       .subscribe(res => {
  //         this.stoppedRequest = false;
  //         if ( res && !res.length) {
  //           this.stoppedRequest = true;
  //         }
  //         this.pushPhotos( res );
  //       });
  //   }else{
  //     this.repeat = [...new Set(this.repeat)]
  //     this.photoService
  //       .listFromToExplorerPaginated(this.photos[this.photos.length - 1].photo_id, this.repeat)
  //       .subscribe(res => {
  //         this.stoppedRequest = false;
  //         this.pushPhotos( res );
  //       });
  //   }
  // }
  // pushPhotos( res ): any{
  //   var self = this;
  //   function arrayUnique(array): any {
  //     var a = array;
  //     for (var i = 0; i < a.length; i++) {
  //       for (var j = i + 1; j < a.length; j++) {
  //         if (a[i].photo_id === a[j].photo_id) {
  //             self.repeat.push(a[i].photo_id.toString());
  //           a.splice(j--, 1);
  //         }
  //       }
  //     }

  //     return a;
  //   }
  //   this.photos = arrayUnique(this.photos.concat(res));
  // }
}

