import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {UserService} from '../../../../core/user/user.service';
import {User} from '../../../../core/user/user';
import {AlertService} from '../../../../shared/alert/alert.service';
import {environment} from '../../../../../environments/environment';
import {HeaderService} from '../../../../core/header/header.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

export interface Setting {
  user: {
    users_avatar_url: string,
    users_cover_url: string
  };
  type: string;
}

@Component({
  selector: 'app-dialog-setting-component',
  templateUrl: 'dialog-setting.component.html',
  styleUrls: ['./dialog-setting.component.scss'],
})
export class DialogSettingComponent implements OnInit{
  user: User;
  user$: Observable<User>;
  photoId: number;
  photoComment: boolean;
  comments;
  userCoverUrl: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileToReturn: any = '';
  stopClick;
  file;
  progress;
  viewCrop = false;
  profileDefault = environment.ApiUrl + 'storage/profile_default/default.png';

  constructor(
    public dialogRef: MatDialogRef<DialogSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Setting,
    private userService: UserService,
    private alertService: AlertService,
    private headerService: HeaderService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.headerService.setCurrentSession('close-to-settings');
    this.user$ = userService.getUserByToken();
    this.user$.subscribe(user => this.user = user);
  }
  ngOnInit(): void{
    this.headerService.setCurrentSession('close-to-settings');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fileChangeEvent(event: any): void {
    this.viewCrop = true;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }
  base64ToFile(data, filename): any {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  cropperReady(): void {
    // cropper ready
  }
  loadImageFailed(): void {
    // show message
  }
  getImageCropped(): void{
    const file = this.base64ToFile(
      this.croppedImage,
      this.imageChangedEvent.target.files[0].name,
    );
    this.file = this.imageChangedEvent.target.files[0];

    this.uploadProfile(file);
  }
  getImageCroppedCover(): void{
    const file = this.base64ToFile(
      this.croppedImage,
      this.imageChangedEvent.target.files[0].name,
    );
    this.file = this.imageChangedEvent.target.files[0];

    this.uploadCover(file);
  }
  uploadProfile( file: File ): void{
    const reader = new FileReader();
    reader.onload = (event: any) => this.file = event.target.result;
    reader.readAsDataURL(file);

    this.userService
      .uploadImgProfile( file )
      .subscribe(
        ( event: HttpEvent<any> ) => {

          if ( event.type === HttpEventType.UploadProgress ){

            this.progress = Math.round(100 * event.loaded / event.total);

          }else if ( event.type === HttpEventType.Response ){
            this.user.users_avatar_url = event.body;
            document.location.reload(true);
            this.alertService.success('Upload complete');
          }
          this.stopClick = false;
          this.croppedImage = '';
          this.headerService.setCurrentSession('');
          this.dialog.closeAll();
          this.router.navigate(['/setting', this.user.users_name]);
        },
        err => {
          this.stopClick = false;
          this.croppedImage = '';
          this.alertService.danger('Failed to load the file, try later\n');
        }
      );

  }
  uploadCover( file: File ): any{
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.file = event.target.result;

    reader.readAsDataURL(file);

    this.userService
      .uploadImgCover( this.file )
      .subscribe(
        ( event: HttpEvent<any> ) => {

          if ( event.type === HttpEventType.UploadProgress ){

            this.progress = Math.round(100 * event.loaded / event.total);

          }else if ( event.type === HttpEventType.Response ){
            this.user.users_cover_url = event.body;
            document.location.reload(true);
            this.alertService.success('Upload complete');
          }
          this.stopClick = false;
          this.croppedImage = '';
          this.headerService.setCurrentSession('');
          this.dialog.closeAll();
          this.router.navigate(['/setting', this.user.users_name]);
        },
        err => {
          this.alertService.danger('Failed to load the file, try later\n');
        }
      );
  }
}
