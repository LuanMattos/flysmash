import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';



import {User} from '../../../core/user/user';
import {UserService} from '../../../core/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../../shared/alert/alert.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SecurityCommonsService} from '../../../shared/services/security-commons.service';
import $ from "jquery";


@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent implements OnInit {
  user: User;
  imgProfileDefaultSanitizer;
  settingForm: FormGroup;
  hidePass = true;
  file: File;
  progress;
  userCoverUrl: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileToReturn: any = '';
  stopClick;

  constructor(
    private securityCommons: SecurityCommonsService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    private route: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.jQuery();
    // this.user = this.activatedRoute.snapshot.data.user;
    // this.user.users_cover_url = this.securityCommons.passSecurityUrl(this.user.users_cover_url, environment.ApiUrl + 'storage/cover_default/default.png');
    // this.user.users_avatar = this.securityCommons.passSecurityUrl(this.user.users_avatar, environment.ApiUrl + 'storage/profile_default/default.png');

    // this.settingForm = this.formBuilder.group({
    //     userEmail: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.email
    //       ]
    //     ],
    //   userPassword: [
    //     '',
    //     [
    //       Validators.minLength(8),
    //       Validators.maxLength(50),
    //     ],
    //   ],
    //   userPasswordChange: [
    //     '',
    //     [
    //       Validators.minLength(8),
    //       Validators.maxLength(50),
    //     ]
    //   ],
    //   file: [],
    //   userAddress: [''],
    //   userDescription: [''],
    // });
    // this.settingForm.patchValue({
    //   userEmail: this.user.users_email,
    //   userAddress: this.user.address,
    //   userDescription: this.user.description
    // });


  }
  jQuery():void{
    $(document).ready(function () {
      const instance = $('.container-setting-profile');
      instance.find('.option-menu').on('click',function(event){
        const section = $(event.currentTarget).data('section');
        toogleMenu( section );
        resetClass();
        $(event.currentTarget).find('span').addClass('active');

      })
      function resetClass(){
        instance.find('.option-menu').map(function(i,el){
          $(el).find('span').removeClass('active')
        })
      }
      function toogleMenu( section ){
        const sectionForm = instance.find('.section-form')
        sectionForm.map(function(i,el){
          const dataSection = $(el).data('section');
          if(dataSection == section){
            $(el).css('display','block')
          }else{
            $(el).css('display','none')
          }
        })
      }
    })
  }
  save(): void{
    const data = this.settingForm.getRawValue();
    this.userService.saveSettings(data).subscribe(success => {
        if (!success){
          this.settingForm.controls.userPassword.setErrors({message : success});
        } else if ( success === 'auth' ){
          this.userService.logout();
          this.route.navigate(['']);
          this.alertService.success('For security, log in again!');
        }else if ( success === 'common'){
          this.route.navigate(['']);
        }
      },
      (response: HttpErrorResponse) => {
        this.settingForm.controls.userPassword.setErrors({message : response.error.text});
      }
    );
  }
  openDialogCover(): void{

  }
  openDialog(): void{
   
  }
}
