import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StoriesService } from 'src/app/core/stories/stories.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import Swal from 'sweetalert2';
import SwiperCore, { EffectCube, Navigation } from "swiper";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
UIkit.use(Icons);


SwiperCore.use([EffectCube, Navigation]);

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  $user;
  openModalStories:boolean;
  right:boolean;
  stories$;
  dataModal;
  isFeed: boolean;
  userName;

  constructor(
    private userService: UserService,
    private storiesService:StoriesService,
    private alertService:AlertService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.isFeedRouter();
  }

  ngOnInit(): void{
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.$user = this.userService.getUser();
    
    if(this.isFeed){
      this.stories$ = this.storiesService.stories;
    }else{
      this.filterStoriesMyProfile();
    }

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.userName = this.activatedRoute.snapshot.params.userName;
        this.isFeedRouter();
        this.filterStoriesMyProfile();
       }
      }
    )
  }
  filterStoriesMyProfile(): void{
    if( this.isLogged ){
        this.$user.subscribe(user=>{ 
          if( user.users_name !== this.userName ){
            this.stories$ = this.storiesService.storiesMyProfile( this.userName );
          }else{
            this.stories$ = this.storiesService.stories;
          }
        }
      )
    }
  }
  screen(){
    this.right= !this.right;
  }
  ngAfterViewInit(): void{    
  }
  openModal(story){
    this.openModalStories = !this.openModalStories;
    this.dataModal = story;
  }
  deleteStorie( storie ): void{
    Swal.fire({
      title: 'Really delete this storie? If you delete, it cannot be undone',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.storiesService.deleteStorie( storie.photos_stories_id )
        .subscribe(
          (res)=>{
            this.storiesService.deletePhotoStorieSubject( (<any>res).photos_stories_id, storie );
            if((<any>res).deleted){
              this.storiesService.deleteStorieSubject( storie );
              this.openModalStories = false;
            }
          },
          (err)=>{
            this.alertService.danger('An error has occurred, please try again later!');
          }
        )
      }else{
       
      }
    });
  }
  isLogged():boolean{
    return this.userService.isLogged();
  }
  isFeedRouter() {
    
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (
            (event['url'] == '/feed' || event['urlAfterRedirects'] == '/feed')
            ||
            (event['url'] == 'feed' || event['urlAfterRedirects'] == 'feed')
          ) {
          this.isFeed = true;
        } else {
          this.isFeed = false;
        }
      }
    })
  }
  
}

