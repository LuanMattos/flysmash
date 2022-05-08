import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import SwiperCore, { Navigation } from "swiper";
import { PostsService } from 'src/app/core/posts/posts.service';

const CLOUD = environment.ApiUrl + '/storage/img/';

@Component({
  selector: 'app-photo-main',
  templateUrl: 'photo-main.component.html',
  styleUrls: ['./photo-main.component.scss'],
  providers: [DatePipe]
})
export class PhotoMainComponent implements AfterViewInit, OnInit{b
  constructor(
    private userService: UserService,
    private postsService: PostsService
  ) {}
  @Input() post;
  @Input() index;
  @Output() postModal: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  open_modal;
  currentIndexComment;
  interval;
  timeLeft = 1;
  timeMinIteraction = 2;

  
  ngOnInit(): void{
    document.addEventListener("DOMContentLoaded", function(event) {
      document.querySelectorAll('video').forEach(function(video){
        video.onerror = function(){this.style.display='none';};
      })
   });
    
  }
  ngAfterViewInit(): void {
    SwiperCore.use([Navigation]);

    const id = this.post.posts_id;
 
      const observador = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && this.open_modal) {
          this.startTimer();
        }else{
          if (this.timeLeft > this.timeMinIteraction){
             this.sendAnalytic(id, this.timeLeft);
          }          
          this.resetTimer();
        }

      }, {
        threshold: [0, 1],
        rootMargin: '0px'
      });
      observador.observe(  document.querySelector('.post-' + id));
  } 

  isLogged(): boolean{
    return this.userService.isLogged();
  }
  postLength(): number{
    return parseInt(this.post.photos.length);
  }
  open( post ): void{
    document.addEventListener("DOMContentLoaded", function(event) {
      document.querySelectorAll('video').forEach(function(video){
        console.log(video)
        console.log(video.onerror)
        video.onerror = function(){this.style.display='none';};
      })
   });
    this.open_modal = true;
  }
  close_modal(){
    this.open_modal = false;
  }
  startTimer(): void {
    this.interval = setInterval(() => {
        this.timeLeft++;
    }, 1000);
  }
  resetTimer(): void {
    clearInterval(this.interval);
    this.timeLeft = 0;
  }
  sendAnalytic(postsId, time): any{
    this.postsService.sendAnalytic(postsId, time).subscribe();
  }

  errorHandler(event): any {
    event.target.style.display='none';
  }
  errorHandlerVideoModal(event,classModal): any {
    (<any>document.querySelector('.'+classModal)).style.display='none'
  }
}
