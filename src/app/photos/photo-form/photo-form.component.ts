import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {ImageCroppedEvent} from 'ngx-image-cropper';


import {PhotoService} from '../photo/photo.service';
import {AlertService} from '../../shared/alert/alert.service';
import {User} from '../../core/user/user';
import {SecurityCommonsService} from '../../shared/services/security-commons.service';
import {HeaderService} from '../../core/header/header.service';


@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  files: Array<any> = []
  progress = 0;
  public: boolean = true;
  allowComments: boolean = true;
  avatar: string;
  user: User;
  imageChangedEvent: any = '';
  videoChangedEvent: any = '';
  croppedImage;
  blockSubmit = false;
  cols;
  classSelectedCarousel;
  errorSubmitForm = '';

  spinner: boolean;
  showPreview: boolean;

  constructor(
    private alertService: AlertService,
    private photoService: PhotoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private securityCommons: SecurityCommonsService,
    public headerService: HeaderService,
  ) {}

  ngOnInit(): void {
    // this.user = this.activatedRoute.snapshot.data.user;
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
      // video: ['']
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
  selectItemCarousel(item: string): void{
    this.classSelectedCarousel = item;
  }
  selectItemCarouselToFilter(item, el){
    document.querySelectorAll('.img-files').forEach(element => {
      element.classList.remove('selected');
    });
    if(el.target.classList.value.indexOf('selected') == -1){
      el.target.classList.add('selected');
    } 
    this.croppedImage = item;
    (<HTMLImageElement>document.querySelector('.source-image')).src = item;
  }
  items(): any[] {
    return [
      '',
      'grayscale-circle',
      'saturate-circle',
      'sepia-circle',
      'invert-circle',
      'opacity-circle',
      'brightness-circle',
      'contrast-circle',
      'hue-rotate-circle',
      'blur-circle',
      'all-the-things-circle',
      'contrast-2-circle',
      'brightness-contrast-1-circle',
      'filter-2-circle',
      'filter-3-circle',
      'filter-4-circle',
      'filter-5-circle',
      'filter-6-circle',
      'filter-7-circle'
    ];
  }
  fileChangeEvent(event: any): void {
    
    this.showPreview = true;
    this.imageChangedEvent = event;
    
    Array.from(event.target.files).forEach(file => {
      let reader = new FileReader();
      reader.readAsDataURL(<Blob>file);
      reader.onload = ()=>{
        this.files.push(reader.result);
        this.croppedImage = this.files[0]
      }; 
    });


      // aqui
    //  console.log(event.base64)

    // console.log(Object.entries(this.filesFileSwiper))
    // event.target.files.map((i,l)=>{
    //   console.log(i)
    //   console.log(l)
    // });
    // console.log(this.files)
  }
  cropperReady(): void {
    // cropper ready
  }
  loadImageFailed(): void {
    // show message
  }
  getImageCropped(): any {
    // const video = this.photoForm.get('video').value;
    const photo = this.photoForm.get('file').value;
    const description = this.photoForm.get('description').value;
    if ( !this.photoForm.valid && !this.photoForm.pending){
      this.errorSubmitForm = 'Insert a photo and a description';
      return false;
    }

    this.files = this.imageChangedEvent.target.files;
    // console.log(this.croppedImage)
    
    // if (this.imageChangedEvent){
    //     this.filesFile = this.base64ToFile( this.croppedImage, this.imageChangedEvent.target.files);
    //   //aqui
    //   console.log(this.imageChangedEvent.target.files)
    //   this.upload(files);
    // }
  }
  getBase64(filename, filepath) {
    return new Promise(resolve => {
      var file = new File([filename], filepath);
      var reader = new FileReader();

      reader.onload = function(event) {
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

    return new File([u8arr], filename, {type: mime});
  }
  fileToBase64(){
    
  }
  uploadVideo(file: File): any {
    const description = this.photoForm.get('description').value;
    const allowComments = this.allowComments;
    // this.classSelectedCarousel
    this.photoService
      .uploadVideo(description, allowComments, this.public, file, '')
      .pipe(
        finalize(() => {
            this.blockSubmit = false;
            this.router.navigate(['']);
          }
        )
      )
      .subscribe(
        (event: HttpEvent<any>) => {

          if (event.type === HttpEventType.UploadProgress) {

            this.progress = Math.round(100 * event.loaded / event.total);

          } else if (event.type === HttpEventType.Response) {
            this.blockSubmit = false;
            this.alertService.success('Upload complete');
          }
        },
        err => {
          this.blockSubmit = false;
          this.alertService.danger('Failed to load the file, try later');
        }
      );
    this.errorSubmitForm = '';
    this.headerService.setCurrentSession('');
  }
  upload(file: File): any {
    const description = this.photoForm.get('description').value;
    const data = this.photoForm.controls;
    this.spinner = true;
    console.log(data)
    return false
    const allowComments = this.allowComments;
    this.photoService
      .upload(description, allowComments, this.public, file, this.classSelectedCarousel)
      .pipe(
        finalize(() => {
            this.blockSubmit = false;
            this.router.navigate(['']);
          }
        )
      )
      .subscribe(
        (event: HttpEvent<any>) => {

          if (event.type === HttpEventType.UploadProgress) {

            this.progress = Math.round(100 * event.loaded / event.total);

          } else if (event.type === HttpEventType.Response) {
            this.blockSubmit = false;
            this.alertService.success('Upload complete');
          }
        },
        err => {
          this.blockSubmit = false;
          this.alertService.danger('Failed to load the file, try later');
        }
      );
    this.errorSubmitForm = '';
    this.headerService.setCurrentSession('');
  }
  removeFile(): void {
    this.photoForm.get('file').reset();
    this.files = [];
    this.showPreview = false;
  }
}
