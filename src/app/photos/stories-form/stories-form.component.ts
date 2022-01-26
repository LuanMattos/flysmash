import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { Camera,  } from '@mediapipe/camera_utils';
import {ControlPanel, FPS, StaticText, Slider,Toggle, SourcePicker} from '@mediapipe/control_utils';
import {drawConnectors,drawLandmarks} from '@mediapipe/drawing_utils';
import {FaceMesh, FACEMESH_TESSELATION, FACEMESH_LEFT_IRIS,FACEMESH_RIGHT_IRIS,FACEMESH_LIPS,FACEMESH_FACE_OVAL,FACEMESH_LEFT_EYEBROW,FACEMESH_LEFT_EYE,FACEMESH_RIGHT_EYEBROW,FACEMESH_RIGHT_EYE} from '@mediapipe/face_mesh';
import { PhotoService } from '../photo/photo.service';


@Component({
  selector: 'app-stories-form',
  templateUrl: './stories-form.component.html',
  styleUrls: ['./stories-form.component.scss']
})
export class StoriesFormComponent implements OnInit {
  videoSourcesSelect;
  MediaStreamHelper;
  videoPlayer;
  constraints;
  snapshotOk;
  cols;
  file;
  filter;
  spinner;
  canvasContext;
  videoElement;
  outputElement;
  viewAr;

  constructor(
    private alertService: AlertService,
    private photoService: PhotoService
  ) { 
  }

  ngOnInit(): void {
      this.videoElement = (<any>document).querySelector('#video');
      this.outputElement = document.getElementById('output');
      this.getUserMediaCamera();
  }
  ngAfterViewInit() {

  

    require('../../../assets/js/script.js');
  }
  
  /** Camera **/
  getUserMediaCamera(): void{
    const btnFront = (<any>document).querySelector('#btn-front');
    const btnBack = (<any>document).querySelector('#btn-back');

    const supports = navigator.mediaDevices.getSupportedConstraints();
      if (!supports['facingMode']) {
        this.alertService.info('Browser Not supported!');
        return;
      }

      let stream;

      const capture = async facingMode => {
        const options = {
          audio: false,
          video: {
            facingMode,
          },
        };

        try {
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
          }
          stream = await navigator.mediaDevices.getUserMedia(options);
        } catch (e) {
          this.alertService.warning(e);
          return;
        }
        this.videoElement.srcObject = null;
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      }

      localStorage.setItem('camSelected', '1');
      capture('environment');

      btnBack.addEventListener('click', () => {
        localStorage.setItem('camSelected', '1');
        capture('environment');
      });

      btnFront.addEventListener('click', () => {
        localStorage.setItem('camSelected', '2');
        capture('user');
      });
  }
  // /** Escreve o canvas na div Output **/
  snapshot(){
    this.spinner = true;
    var snapshots = [];
    
   this.drawVideoIntoCanvas(this.videoElement);

    this.file = this.canvasContext.canvas.toDataURL('image/jpg');
    snapshots.unshift(this.canvasContext.canvas);
    this.outputElement.innerHTML = '';
    for (var i = 0; i < snapshots.length; i++) {
      this.outputElement.appendChild(snapshots[i]);
    }
    this.snapshotOk = true;
    setInterval(()=>{
      this.spinner = false;
    },2000)
  }
  // /** Escreve o video no canvas Context **/
  drawVideoIntoCanvas(video) {
    var w = video.videoWidth;
    var h = video.videoHeight;
    
    this.canvasContext = document.createElement('canvas');
    this.canvasContext.style.width = '100%';
    this.canvasContext.style.height = '100vh';
    this.canvasContext.style.objectFit = 'cover';
    this.canvasContext.width = w;
    this.canvasContext.height = h;
    this.canvasContext = this.canvasContext.getContext('2d');
    this.canvasContext.drawImage(video, 0, 0, w, h);
  }  
  changeCamera(): void {
    const btnFront = (<any>document).querySelector('#btn-front');
    const btnBack = (<any>document).querySelector('#btn-back');
    const camera = localStorage.getItem('camSelected');
    if (camera == '1') {
      btnFront.click();
    } else if (camera == '2') {
      btnBack.click();
    }
  }
  getAr(): void{
    this.spinner = true;
    this.viewAr = true;
    setTimeout(()=>{
      this.spinner = false;
    },3000)
  }
  closeAr(): void{
    this.viewAr = false;
  }
  undo(): void{
    this.snapshotOk = false;
  }
  items(): any[] {
    return this.photoService.filters();
  }
  selectItemCarousel(item: string,i): void {
    this.filter = item;
  }
  // /** Input file **/ 
  openFile(): any{
    (<HTMLAreaElement>document.querySelector('.file-input-stories-form')).click()
  }
  fileChangeEvent($event){
    const file = $event.target.files[0];

    let reader = new FileReader();
      reader.onloadstart = () => {this.spinner = true;}
      reader.readAsDataURL(<Blob>file);
      reader.onload = () => {
        this.file = reader.result;
        
        this.snapshotOk = true;
        
        const imgOutput = <any>document.getElementById('outputImage');
         imgOutput.width = 100;
         imgOutput.height = 100;
         imgOutput.style.display = 'flex';
         imgOutput.src = this.file;

      reader.onprogress = () => {this.spinner = true;}
      reader.onloadend = (event) => { this.spinner = false; }
    }

  }
}
