import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ImageCroppedEvent, base64ToFile, LoadedImage } from 'ngx-image-cropper';
import Swal from 'sweetalert2';


import { PhotoService } from '../../photo/photo.service';
import { AlertService } from '../../../shared/alert/alert.service';
import { User } from '../../../core/user/user';
import { SecurityCommonsService } from '../../../shared/services/security-commons.service';
import { HeaderService } from '../../../core/header/header.service';
import { PostsService } from 'src/app/core/posts/posts.service';
import { UserService } from 'src/app/core/user/user.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-photo-profile-form',
  templateUrl: './photo-profile-form.component.html',
  styleUrls: ['./photo-profile-form.component.scss']
})
export class PhotoProfileFormComponent implements OnInit {

  photoFormProfile: FormGroup;
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
  eventCroop: Event;
  imageBase64String;
  currentIndex;
  user$:Observable<User>;
  hasImage:boolean = false;

  constructor(
    private alertService: AlertService,
    private photoService: PhotoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private securityCommons: SecurityCommonsService,
    public headerService: HeaderService,
    private postsService:PostsService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();

    this.photoFormProfile = this.formBuilder.group({
      file: [
        '',
        Validators.required
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
      reader.onloadend = (event) => {this.spinnerFile = false;this.hasImage = true;}
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
  items():any[]{
    return this.photoService.filters()
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
 
  /** Form Events **/
  uploadVideo(file: File): any {
    // this.classSelectedCarousel
    this.photoService
      .updatePhotoProfile(file)
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
  save(): any {
    this.spinner = true;
    if ( this.photoFormProfile.valid && !this.photoFormProfile.pending && this.files.length ) {
      this.postsService.updateAvatar(this.files)
      .pipe( finalize(() => {
        // history.back()
      }) )
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            const authToken = event.headers.get('x-access-token');
            const url = event.body;
            this.userService.updateAvatarUserSubject(url, authToken);
            history.back()
            // this.postsService.addPostsSubject(event.body)
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
  /** Helpers **/
  uriToImage(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  clickInput(){ 
    (<HTMLElement>document.querySelector('.file-input')).click();
  }
}
