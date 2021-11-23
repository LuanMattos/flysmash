import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from '../../../environments/environment';
import { DatePipe } from '@angular/common';

const CLOUD = environment.ApiUrl + '/storage/img/';

@Component({
  selector: 'app-photo',
  templateUrl: 'photo.component.html',
  styleUrls: ['./photo.scss'],
  providers: [DatePipe]
})
export class PhotoComponent implements AfterViewInit, OnInit{
  constructor(
    // private photoService: PhotoService,
    // private activatedRoute: ActivatedRoute
  ) {}
  @Input() post;
  @Output() postModal: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  // @Input() description = '';
  // @Input() _url = '';
  // @Input() photo_id;
  // @Input() set url( url: string ){
  //   if (!url.startsWith('data')){
  //     this._url = url;
  //   }else{
  //     this._url = url;
  //   }
  // }
  postLength(): number{
    return parseInt(this.post.photos.length);
  }
  open( post ): void{
    this.postModal.emit(post);
  }
  // timeLeft = 0;
  // interval;
  // items = [];
  // isDetailOrTimeline;
  ngOnInit(): void{
    // this.isModuleDetailOrTimeline();
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
  ngAfterViewInit(): void{
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
  }
  // sendStatistic(photoId, time): any{
  //   this.photoService.registerViewPhoto(photoId, time).subscribe();
  // }
  // errorHandler(event): any {
  //   event.target.src = 'https://be.mycircle.click/storage/default/error-photo.png';
  //   this.photoService.registerErrorPhoto(this.photo_id).subscribe();
  // }
}
