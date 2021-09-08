import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from "../../photo/photo.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnChanges, AfterViewInit, OnInit {
  @ViewChild('video', { static: true }) video: ElementRef;
  @Input() url;
  @Input() video_id;
  muted;
  startTimer(): void {
    this.interval = setInterval(() => {
      this.timeLeft++;
    }, 1000);
  }
  timeLeft = 0;
  interval;
  buttonClass: string;
  isDetailOrTimeline;
  pauseTimer(): void {
    this.timeLeft = 0;
  }
  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }
  ngOnChanges(changes: SimpleChanges): void { }
  ngOnInit(): void{
    this.isModuleDetailOrTimeline();
  }
  isModuleDetailOrTimeline(): void{
    this.isDetailOrTimeline = this.activatedRoute.snapshot.data.isDetail || this.activatedRoute.snapshot.data.isTimeline;
  }
  ngAfterViewInit(): void {
    // const id = this.video_id;
    // const observador = new IntersectionObserver((entries) => {
    //   const entry = entries[0];
    //   if (entry.isIntersecting) {
    //     this.startTimer();
    //     this.video.nativeElement.mute = true;

    //     if (window.innerWidth < 754 && this.isDetailOrTimeline) {
    //       this.buttonClass = 'play';
    //       var playPromise = this.video.nativeElement.play();

    //       if (playPromise !== undefined) {
    //         playPromise.then(_ => {}).catch(error => {});
    //       }
    //     }
    //   } else {
    //     if (this.timeLeft > 2) {
    //       this.sendStatisticVideo(id, this.timeLeft);
    //     }
    //     if (window.innerWidth < 754) {
    //       this.buttonClass = '';
    //       var stopPromise = this.video.nativeElement.pause();
    //       if (stopPromise !== undefined) {
    //         stopPromise.then(_ => {}).catch(error => {});
    //       }          
    //     }
    //     this.pauseTimer();
    //   }

    // }, {
    //   threshold: [0.6, 1],
    //   rootMargin: '0px'
    // });
    // observador.observe(document.querySelector('.video-' + id));
  }
  sendStatisticVideo(videoId, time): any {
    this.photoService.registerViewPhoto(videoId, time).subscribe();
  }
  playPause(): void {
    if (this.video.nativeElement.paused) {
      this.buttonClass = 'play';
      this.video.nativeElement.play();
    } else {
      this.buttonClass = '';
      this.video.nativeElement.pause();
    }
  }
  startStopSound(): void {
    if (this.video.nativeElement.volume) {
      this.video.nativeElement.volume = 0;
      this.muted = 'muted';
    } else {
      this.video.nativeElement.volume = 1;
      this.muted = '';
    }
  }
  redirect(): void{
    this.router.navigate(['p',this.video_id])
  }
  eventClickMovie():void{
    if(this.activatedRoute.snapshot.data.isToExplorer || this.activatedRoute.snapshot.data.isProfile){
      this.redirect();
    }else{
      this.playPause();
    }
  }
}
