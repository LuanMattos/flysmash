import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StoriesService } from 'src/app/core/stories/stories.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import Swal from 'sweetalert2';
import SwiperCore, { EffectCube, Navigation } from "swiper";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
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

  constructor(
    private userService: UserService,
    private storiesService:StoriesService,
    private alertService:AlertService
  ) {}

  ngOnInit(): void{
    this.$user = this.userService.getUser();
    if( this.userService.isLogged() ){
      this.stories$ = this.storiesService.stories;
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
  
}

