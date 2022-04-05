import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { PhotoService } from '../photo/photo.service';


// import { Camera, } from '@mediapipe/camera_utils';
// import { ControlPanel, FPS, StaticText, Slider, Toggle, SourcePicker } from '@mediapipe/control_utils';
// import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
// import { FaceMesh, FACEMESH_TESSELATION, FACEMESH_LEFT_IRIS, FACEMESH_RIGHT_IRIS, FACEMESH_LIPS, FACEMESH_FACE_OVAL, FACEMESH_LEFT_EYEBROW, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYEBROW, FACEMESH_RIGHT_EYE } from '@mediapipe/face_mesh';


import * as tf from '@tensorflow/tfjs'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as MediaPipeFaceMesh from '@mediapipe/face_mesh';
import { FacePaint } from './FacePaint';
import { ImageCroppedEvent, base64ToFile, LoadedImage } from 'ngx-image-cropper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoriesService } from 'src/app/core/stories/stories.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


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
  carousel;
  background;
  entries;
  videoFormats = ['mov', 'm4v', 'mp4'];
  assets = [];
  el;
  faceCanvas;
  toggleBtn;
  toggleBtnLabel;
  webcam;
  loaderMsg;
  model;
  w;
  h;
  snapshotOkArGalery;
  imageChangedEvent;
  croppedImage;
  imageBase64String;
  stream;
  storiesForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private photoService: PhotoService,
    private storiesService: StoriesService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.videoElement = (<any>document).querySelector('#video');
    this.outputElement = document.getElementById('output');
    this.carousel = document.querySelector('.carousel');
    this.background = document.querySelector('#background');
    this.toggleBtn = document.querySelector('#visibilityToggle');
    this.webcam = document.querySelector('#webcam');
    this.loaderMsg = document.querySelector('#loaderMsg');

    this.entries = new FacePaint().getEntries();

    this.storiesForm = this.formBuilder.group({
      file: [
        '',
      ],
      description: [
        '',
        [
          Validators.maxLength(1000)
        ]
      ],
    });

    this.getUserMediaCamera();
    this.resize()
  }
  ngAfterViewInit() {
    window.onpopstate = (event) => {
      this.closeAr()
    };
  }
  ngOnDestroy(): void {
    this.stream.getTracks().forEach(function(track) {
      track.stop();
    });

  }
  resize(): void {
    if (window.innerWidth < 700) {
      this.cols = '3';
    } else {
      this.cols = '6';
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 700) {
        this.cols = '3';
      } else {
        this.cols = '6';
      }
    }
    );
  }
  /** Face filter **/
  getFaceFilter(): void {
    for (var i = 0; i < this.entries.length; i++) {
      var obj = this.entries[i];
      if (this.videoFormats.indexOf(obj.entry.split('.')[2]) > -1) {
        this.el = document.createElement('video');
        this.el.setAttribute('playsinline', true);
        this.el.setAttribute('loop', true);
        this.el.setAttribute('muted', true);
        this.el.setAttribute('autoplay', true);
        this.el.setAttribute('preload', 'auto');
        this.assets.push(new Promise(res => {
          this.el.onloadeddata = res;
        }));
      } else {
        this.el = document.createElement('img');
        this.assets.push(new Promise(res => {
          this.el.onload = res;
        }));
      }
      this.el.src = obj.entry;
      this.el.classList.add('texture');
      this.el.classList.add('d-none');
      this.el.setAttribute('id', obj.handle)
      this.carousel.appendChild(this.el);
    }
    this.main()

  }
  updateTexture(index) {
    var url = this.entries[index].entry;
    var isVideo = this.videoFormats.indexOf(url.split('.')[2]) > -1;
    this.faceCanvas.updateTexture(url, isVideo);
    this.background.style.background = this.entries[index].background;
  }
  viewTexture(url) {
    this.faceCanvas.updateTexture(url, false);
  }
  toggleWebcamVisibility() {
    this.toggleBtn.classList.toggle('on');
    this.webcam.classList.toggle('visible');
    if (this.toggleBtn.classList.contains('on')) {
      this.toggleBtn.style.background = 'white';
    } else {
      this.toggleBtn.style.background = '#9369e9';
    }
  }

  async main() {
    var self = this;
    async function renderPredictions(t) {
      const request = requestAnimationFrame(renderPredictions);
      localStorage.setItem('requestId', request.toString())
      self.loaderMsg.textContent = 'Search face';
      const options = {
        input: self.webcam,
        returnTensors: false,
        flipHorizontal: false,
      };
      const predictions = await self.model.estimateFaces(options);

      if (predictions.length > 0) {
        const positionBufferData = predictions[0].scaledMesh.reduce((acc, pos) => acc.concat(pos), []);
        if (!self.faceCanvas) {
          const props = {
            id: 'faceCanvas',
            // aqui que vai a imagem escolhida
            textureFilePath: self.entries[0].entry,
            w: self.w,
            h: self.h
          }
          // Aqui que vem o desenho do three
          self.faceCanvas = new FacePaint('faceCanvas', self.entries[0].entry, self.w, self.h);
          // se ocorrer o evento changeo do carousel ele executara o updateTexture (local)
          self.updateTexture(0);
          (<any>document.querySelector('#loader')).style.display = 'none';
          return;
        }
        self.faceCanvas.render(positionBufferData);
      }
    }

    try {
      this.spinner = true;
      this.loaderMsg.textContent = 'Load webcam';
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      this.webcam.srcObject = stream;
      await new Promise((res) => {
        this.webcam.onloadedmetadata = () => {
          this.w = this.webcam.videoWidth;
          this.h = this.webcam.videoHeight;
          res(0);
        }
      });


      this.webcam.height = this.h;
      this.webcam.width = this.w;
      this.webcam.setAttribute('autoplay', true);
      this.webcam.setAttribute('muted', true);
      this.webcam.setAttribute('playsinline', true);
      this.webcam.play();
      this.loaderMsg.textContent = 'Load model';
      // Load the MediaPipe facemesh model.

      this.model = await faceLandmarksDetection.load(<any>'mediapipe-facemesh', {
        maxContinuousChecks: 5,
        detectionConfidence: 0.9,
        maxFaces: 1,
        iouThreshold: 0.3,
        scoreThreshold: 0.75
      });
      this.loaderMsg.textContent = 'Load media';
      await Promise.all(this.assets);
      this.spinner = false;
      renderPredictions(0);
    } catch (e) {
      console.log(e)
    }
    tf.env().set('WEBGL_CPU_FORWARD', true);

  }
  /** END Face filter **/

  /** Camera **/
  getUserMediaCamera(): void {
    const btnFront = (<any>document).querySelector('#btn-front');
    const btnBack = (<any>document).querySelector('#btn-back');

    const supports = navigator.mediaDevices.getSupportedConstraints();
    if (!supports['facingMode']) {
      this.alertService.info('Browser Not supported!');
      return;
    }

    this.stream;

    const capture = async facingMode => {
      const options = {
        audio: false,
        video: {
          facingMode,
        },
      };

      try {
        if (this.stream) {
          const tracks = this.stream.getTracks();
          tracks.forEach(track => track.stop());
        }
        this.stream = await navigator.mediaDevices.getUserMedia(options);
      } catch (e) {
        this.alertService.warning(e);
        return;
      }
      this.videoElement.srcObject = null;
      this.videoElement.srcObject = this.stream;
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
  snapshot() {
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
    setInterval(() => {
      this.spinner = false;
    }, 2000)
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
  getAr(): void {
    this.getFaceFilter();
    this.viewAr = true;
  }
  closeAr(): void {
    window.cancelAnimationFrame(parseInt(localStorage.getItem('requestId')));
    this.viewAr = false;
    this.snapshotOkArGalery = false;
  }
  photoArGalery(): void {
    (<HTMLAreaElement>document.querySelector('.file-input-stories-form-ar-galery')).click()
  }
  photoAr(): void {

  }
  undo(): void {
    this.snapshotOk = false;
  }
  items(): any[] {
    return this.photoService.filters();
  }
  itemsFilterFace(): any[] {
    return this.entries
  }
  selectItemCarousel(item: string, i): void {
    this.filter = item;
  }
  selectItemCarouselFaceFilter(item: string, i): void {
    this.updateTexture(i);
  }
  // /** Input file **/ 
  openFile(): any {
    (<HTMLAreaElement>document.querySelector('.file-input-stories-form')).click()
  }
  fileChangeEvent($event) {
    const file = $event.target.files[0];

    let reader = new FileReader();
    reader.onloadstart = () => { this.spinner = true; }
    reader.readAsDataURL(<Blob>file);
    reader.onload = () => {
      this.file = reader.result;

      this.snapshotOk = true;

      const imgOutput = <any>document.getElementById('outputImage');
      imgOutput.width = 100;
      imgOutput.height = 100;
      imgOutput.style.display = 'flex';
      imgOutput.src = this.file;

      reader.onprogress = () => { this.spinner = true; }
      reader.onloadend = (event) => { this.spinner = false; }
    }
  }
  fileChangeEventAr($event) {
    const file = $event.target.files[0];
    this.imageChangedEvent = $event;
    this.croppedImage = file;
    if (file) {
      let reader = new FileReader();
      reader.onloadstart = () => { this.spinner = true; }
      reader.readAsDataURL(<Blob>file);
      reader.onload = () => {
        this.file = reader.result;
        this.imageBase64String = this.file

        // const imgOutput = <any>document.getElementById('outputImageArGalery');
        // imgOutput.width = 100;
        // imgOutput.height = 100;
        // imgOutput.style.display = 'flex';
        // imgOutput.src = this.file;

        reader.onprogress = () => { this.spinner = true; }
        reader.onloadend = (event) => { this.spinner = false; this.snapshotOkArGalery = true }
      }
    }
  }
  imageCropped(event: ImageCroppedEvent): any {
    this.file = event.base64;
    this.viewTexture(this.file)
  }
  confirmeCropped(): void {
    this.entries.push(
      {
        handle: '',
        url: 'https://en.wikipedia.org/wiki/Jamini_Roy#Style',
        entry: this.file,
        background: '',
        type: 'image'
      }
    )
    this.updateTexture(this.entries.length - 1)
    this.closeCroppedAr();
  }
  closeCroppedAr():void {
    this.snapshotOkArGalery = false;
  }
  emmitSubmit(): void{
    this.storiesForm.markAllAsTouched();
  }
  actionSubmit():void{
    this.spinner = true;
  }
  saveStorie(): void{
    this.spinner = true;
    const description = this.storiesForm.get('description').value;

    if ( this.storiesForm.valid && !this.storiesForm.pending && (this.file && this.file.length)  ) {
      this.storiesService.upload(description, this.file, this.filter?this.filter:'')
      .pipe(
         finalize(() => {this.router.navigate(['feed']);})
      )
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.storiesService.addStoriesSubject(event.body)
          }
        },
        err => {
         
        }
      );
    }else{
      this.spinner = false;
    }
  }
}
