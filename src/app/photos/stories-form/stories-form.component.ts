import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { Camera,  } from '@mediapipe/camera_utils';
import {ControlPanel, FPS, StaticText, Slider,Toggle, SourcePicker} from '@mediapipe/control_utils';
import {drawConnectors,drawLandmarks} from '@mediapipe/drawing_utils';
import {FaceMesh, FACEMESH_TESSELATION, FACEMESH_LEFT_IRIS,FACEMESH_RIGHT_IRIS,FACEMESH_LIPS,FACEMESH_FACE_OVAL,FACEMESH_LEFT_EYEBROW,FACEMESH_LEFT_EYE,FACEMESH_RIGHT_EYEBROW,FACEMESH_RIGHT_EYE} from '@mediapipe/face_mesh';

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

  constructor(
    private alertService: AlertService,
  ) { 
  }

  ngOnInit(): void {
    (() => {
      const videoElm = (<any>document).querySelector('#video');
      const btnFront = (<any>document).querySelector('#btn-front');
      const btnBack = (<any>document).querySelector('#btn-back');

      const supports = navigator.mediaDevices.getSupportedConstraints();
      if (!supports['facingMode']) {
        alert('Browser Not supported!');
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
          alert(e);
          return;
        }
        videoElm.srcObject = null;
        videoElm.srcObject = stream;
        videoElm.play();
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
}
