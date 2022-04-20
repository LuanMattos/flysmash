import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import SwiperCore, { Navigation } from "swiper";

const CLOUD = environment.ApiUrl + '/storage/img/';

@Component({
  selector: 'app-photo-main',
  templateUrl: 'photo-main.component.html',
  styleUrls: ['./photo-main.component.scss'],
  providers: [DatePipe]
})
export class PhotoMainComponent implements AfterViewInit, OnInit{
  constructor(
    private userService: UserService
  ) {}
  @Input() post;
  @Output() postModal: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  open_modal;

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
  // timeLeft = 0;
  // interval;
  // items = [];
  // isDetailOrTimeline;
  ngOnInit(): void{
    // this.isModuleDetailOrTimeline();
  }
  ngAfterViewInit(): void {
    SwiperCore.use([Navigation]);
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
  // isModuleDetailOrTimeline(): void{
  //   this.isDetailOrTimeline = this.activatedRoute.snapshot.data.isDetail || this.activatedRoute.snapshot.data.isTimeline;
  // }
  // startTimer(): void {
  //   this.interval = setInterval(() => {
  //       this.timeLeft++;
  //   }, 1000);
  // }

  // pauseTimer(): void {
  //   this.timeLeft = 0;
  // }
  // ngAfterViewInit(): void{
      // const id = this.photo_id;
      // const observador = new IntersectionObserver((entries) => {
      //   const entry = entries[0];
      //   if (entry.isIntersecting) {
      //     this.startTimer();
      //   }else{
      //     if (this.timeLeft > 2){
      //       this.sendStatistic(id, this.timeLeft);
      //     }
      //     this.pauseTimer();
      //     // observador.unobserve(entry.target);
      //   }

      // }, {
      //   threshold: [0, 1],
      //   rootMargin: '0px'
      // });
      // observador.observe(  document.querySelector('.image-' + id));
  // }
  // sendStatistic(photoId, time): any{
  //   this.photoService.registerViewPhoto(photoId, time).subscribe();
  // }
  // errorHandler(event): any {
  //   event.target.src = 'https://be.mycircle.click/storage/default/error-photo.png';
  //   this.photoService.registerErrorPhoto(this.photo_id).subscribe();
  // }
}
