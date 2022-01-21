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

  constructor(
    private alertService: AlertService,
    private photoService: PhotoService
  ) { 
  }

  ngOnInit(): void {
    (() => {
      this.videoElement = (<any>document).querySelector('#video');
      const btnFront = (<any>document).querySelector('#btn-front');
      const btnBack = (<any>document).querySelector('#btn-back');
      this.outputElement = document.getElementById('output');


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

    })();
  }

  /** Escreve o canvas na div Output **/
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
  /** Escreve o video no canvas Context **/
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
  // ngAfterViewInit() {

  //   testSupport([
  //     { client: 'Chrome' },
  //   ]);

  //   function testSupport(supportedDevices: { client?: string; os?: string; }[]) {


  //   }

  //   const drawingUtils = (<any>window);

  //   const config = {
  //     locateFile: (file) => {
  //       return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`;
  //     }
  //   };

  //   const videoElement = (<any>document).querySelector('#video')[0] as HTMLVideoElement;
  //   const canvasElement = document.getElementsByClassName('output_canvas')[0] as HTMLCanvasElement;
  //   const controlsElement = document.getElementsByClassName('control-panel')[0] as HTMLDivElement;
  //   const canvasCtx = canvasElement.getContext('2d')!;

  //   const solutionOptions = {
  //     selfieMode: true,
  //     enableFaceGeometry: false,
  //     maxNumFaces: 1,
  //     refineLandmarks: false,
  //     minDetectionConfidence: 0.5,
  //     minTrackingConfidence: 0.5
  //   };

  //   const newFps = new FPS();
  //   const fpsControl = newFps;


  //   function onResults(results): void {
  //     document.body.classList.add('loaded');

  //     // fpsControl.tick();

  //     canvasCtx.save();
  //     canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  //     canvasCtx.drawImage(
  //       results.image, 0, 0, canvasElement.width, canvasElement.height);
  //     if (results.multiFaceLandmarks) {
  //       for (const landmarks of results.multiFaceLandmarks) {
  //         drawConnectors(
  //           canvasCtx, landmarks, FACEMESH_TESSELATION,
  //           { color: '#C0C0C070', lineWidth: 0.5 });
  //         drawConnectors(
  //           canvasCtx, landmarks, FACEMESH_RIGHT_EYE,
  //           { color: '#FF3030' });
  //         drawConnectors(
  //           canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW,
  //           { color: '#FF3030' });
  //         drawConnectors(
  //           canvasCtx, landmarks, FACEMESH_LEFT_EYE,
  //           { color: '#30FF30' });
  //         drawConnectors(
  //           canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW,
  //           { color: '#30FF30' });
  //         drawConnectors(
  //           canvasCtx, landmarks, FACEMESH_FACE_OVAL,
  //           { color: '#E0E0E0' });
  //         drawConnectors(
  //           canvasCtx, landmarks, FACEMESH_LIPS, { color: '#E0E0E0' });
  //         if (solutionOptions.refineLandmarks) {
  //           drawConnectors(
  //             canvasCtx, landmarks, FACEMESH_RIGHT_IRIS,
  //             { color: '#FF3030' });
  //           drawConnectors(
  //             canvasCtx, landmarks, FACEMESH_LEFT_IRIS,
  //             { color: '#30FF30' });
  //         }
  //       }
  //     }
  //     canvasCtx.restore();
  //   }

  //   const faceMesh = new FaceMesh(config);
  //   faceMesh.setOptions(solutionOptions);
  //   faceMesh.onResults(onResults);

  //   // Present a control panel through which the user can manipulate the solution
  //   // options.
  //   new ControlPanel(controlsElement, solutionOptions)
  //     .add([
  //       // fpsControl,
  //       new SourcePicker({
  //         onFrame:
  //           async (input, size) => {
  //             const aspect = size.height / size.width;
  //             let width: number, height: number;
  //             if (window.innerWidth > window.innerHeight) {
  //               height = window.innerHeight;
  //               width = height / aspect;
  //             } else {
  //               width = window.innerWidth;
  //               height = width * aspect;
  //             }
  //             canvasElement.width = width;
  //             canvasElement.height = height;
  //             await faceMesh.send({ image: input });
  //           },
  //       }),
  //     ])
  //     .on(x => {

  //     });
  // }
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
  undo(): void{
    this.snapshotOk = false;
  }
  items(): any[] {
    return this.photoService.filters();
  }
  selectItemCarousel(item: string,i): void {
    this.filter = item;
  }
  /** Input file **/ 
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
