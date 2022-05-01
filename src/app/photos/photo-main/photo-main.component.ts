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

  

  // @Input() _url = '';
  // @Input() photo_id;
  // @Input() set url( url: string ){
  //   if (!url.startsWith('data')){
  //     this._url = url;
  //   }else{
  //     this._url = url;
  //   }
  // }
  // get url(): string{
  //   return this._url;
  // }
  
  // items = [];
  // isDetailOrTimeline;
  ngOnInit(): void{
    // this.isModuleDetailOrTimeline();
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
  // isModuleDetailOrTimeline(): void{
  //   this.isDetailOrTimeline = this.activatedRoute.snapshot.data.isDetail || this.activatedRoute.snapshot.data.isTimeline;
  // }


  // errorHandler(event): any {
  //   event.target.src = 'https://be.mycircle.click/storage/default/error-photo.png';
  //   this.photoService.registerErrorPhoto(this.photo_id).subscribe();
  // }
}
