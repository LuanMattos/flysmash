import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ImageCroppedEvent, base64ToFile, LoadedImage } from 'ngx-image-cropper';
import Swal from 'sweetalert2';


import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/alert/alert.service';
import { User } from '../../core/user/user';
import { SecurityCommonsService } from '../../shared/services/security-commons.service';
import { HeaderService } from '../../core/header/header.service';
import { PostsService } from 'src/app/core/posts/posts.service';
import { UserService } from 'src/app/core/user/user.service';



@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  files: Array<any> = [];
  progress = 0;
  user: User;
  imageChangedEvent: any = '';
  videoChangedEvent: any = '';
  croppedImage;
  cols;
  classSelectedCarousel;
  errorSubmitForm = '';
  spinner: boolean;
  spinnerFile: boolean;
  showPreview: boolean;
  showPanelCrop: boolean;
  eventCroop: Event;
  imageBase64String;
  currentIndex;
  $user;
  publicCheck: boolean;

  constructor(
    private alertService: AlertService,
    private photoService: PhotoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private securityCommons: SecurityCommonsService,
    public headerService: HeaderService,
    private postsService:PostsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.$user = this.userService.getUser();
    // this.avatar = this.securityCommons.passSecurityUrl(this.user.users_avatar, environment.ApiUrl + 'storage/profile_default/default.png');
    this.photoForm = this.formBuilder.group({
      file: [
        '',
        Validators.required
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      ],
    });
    this.resize();
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
  /** Input File Events **/
  fileChangeEvent(event: any): void {     
    this.files = [];  
    
    this.imageChangedEvent = event;
    Array.from(event.target.files).forEach(file => {
      
      let reader = new FileReader();
      reader.onloadstart = () => {this.spinnerFile = true;}
      reader.readAsDataURL(<Blob>file);
      reader.onload = () => {
        this.files.push({'file':reader.result,'filter':''});
        this.croppedImage = this.files[0].file;    
      };
      reader.onprogress = () => {this.spinnerFile = true;}
      reader.onloadend = (event) => { this.showPreview = true;this.spinnerFile = false;this.showPanelCrop = true; }
    });
    this.currentIndex = 0;
  }

  /** Cropped Events **/
  imageCropped(event: ImageCroppedEvent): any {
    this.croppedImage = event.base64;
    if(this.currentIndex !== undefined ){
      this.files[this.currentIndex].file = event.base64;
    }
  }
  cropperReady() {
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  loadImageFailed(): void {

  }
  /** Carousel Events **/
  selectItemCarousel(item: string): void {
    this.files[this.currentIndex].filter = item;
    this.classSelectedCarousel = item;
  }
  selectItemCarouselToFilter(item, $event, index) {
    document.querySelectorAll('.img-files').forEach(element => {
      element.classList.remove('selected');
    });
    if ($event.target.classList.value.indexOf('selected') == -1) {
      $event.target.classList.add('selected');
    }
    this.imageBase64String = item;
    this.currentIndex = index;
  }
  items(): any[] {
    return this.photoService.filters();
  }
  /** Form Events **/
  uploadVideo(file: File): any {
    const description = this.photoForm.get('description').value;
    // this.classSelectedCarousel
    this.photoService
      .uploadVideo(description,  file, '')
      .pipe(
        finalize(() => {
          this.router.navigate(['']);
        }
        )
      )
      .subscribe(
        (event: HttpEvent<any>) => {

          if (event.type === HttpEventType.UploadProgress) {

            this.progress = Math.round(100 * event.loaded / event.total);

          } else if (event.type === HttpEventType.Response) {
            this.alertService.success('Upload complete');
          }
        },
        err => {
          this.alertService.danger('Failed to load the file, try later');
        }
      );
    this.errorSubmitForm = '';
    this.headerService.setCurrentSession('');
  }
  upload(): any {
    this.spinner = true;
    const photo = this.photoForm.get('file').value;
    const description = this.photoForm.get('description').value;

    if ( this.photoForm.valid && !this.photoForm.pending && this.files.length ) {
      this.postsService.upload(this.publicCheck,description, this.files)
      .pipe(
        finalize(() => {this.router.navigate(['feed']);})
      )
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.postsService.addPostsSubject(event.body)
          }
        },
        err => {
         
        }
      );
    }else{
      this.errorSubmitForm = 'Insert a photo and a description';
      this.spinner = false;
    }
  }
  removeFile(): void {
    this.photoForm.get('file').reset();
    this.files = [];
    this.showPreview = false;
    this.showPanelCrop = false;
  }
  /** Helpers **/
  getBase64(filename, filepath) {
    return new Promise(resolve => {
      var file = new File([filename], filepath);
      var reader = new FileReader();

      reader.onload = function (event) {
        resolve(event.target.result);
      };

      reader.readAsDataURL(file);
    });
  }
  base64ToFile(data, filename): any {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  validInputFile(){
    if(this.files.length){
      Swal.fire({
        title: 'All your photos and changes will be lost, do you want to continue? (Discard All Changes)',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isDenied) {
        }else{
          (<HTMLElement>document.querySelector('.file-input')).click();
        }
      });
    }else{
      (<HTMLElement>document.querySelector('.file-input')).click();
    }
  }
  tooglePublicPost():void{
    this.publicCheck = !this.publicCheck;
  }
}
