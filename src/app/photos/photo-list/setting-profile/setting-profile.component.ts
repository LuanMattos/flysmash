import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { User } from '../../../core/user/user';
import { UserService } from '../../../core/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../shared/alert/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityCommonsService } from '../../../shared/services/security-commons.service';
import $ from "jquery";


@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent implements OnInit {
  user: User;
  settingForm: FormGroup;
  messageError: string;
  spinner;
  setting_validation_messages = {
    'firstName': [
      { type: 'required', message: 'First name is required' },
      { type: 'minlength', message: 'First name must be at least 3 characters long' },
      { type: 'maxlength', message: 'First name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your name must not contain numbers' }
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required' },
      { type: 'minlength', message: 'Last name must be at least 3 characters long' },
      { type: 'maxlength', message: 'Last name cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your name must not contain numbers' }
    ],
    'userEmail': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'confirmPassword': [
      { type: 'areEqual', message: 'Password mismatch' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'maxlength', message: 'The password must have a maximum of 40 characters' },
      { type: 'pattern', message: 'Your password must contain an uppercase and special characters like (@,!,#...)' }
    ],
    'description': [
      { type: 'required', message: 'Description is required' },
      { type: 'maxlength', message: 'The password must have a maximum of 255 characters' },
    ]
  };

  constructor(
    private securityCommons: SecurityCommonsService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    private route: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.jQuery();
    
    this.settingForm = this.formBuilder.group({
      userEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]
      ],
      password: ['',
        [
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/),
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
        ]
      ],
      confirmPassword: ['',
        [
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/),
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
        ]
      ],
      description: ['', [
        Validators.maxLength(255),
      ]],
    });

    this.userService.getDataUser(null).subscribe(data=>{
      this.settingForm.controls.userEmail.setValue(data.users_email)
      this.settingForm.controls.lastName.setValue(data.users_last_name)
      this.settingForm.controls.firstName.setValue(data.users_first_name)
      this.settingForm.controls.description.setValue(data.users_description)
    });


  }

  save(): void {
    const data = this.settingForm.getRawValue();
    if (this.settingForm.valid) {
      this.spinner = true;
      this.userService.saveSettings(data).subscribe(success => {
        this.spinner = false;
        this.alertService.success('Your data has been saved successfully');
        history.back()
      },
        (response: HttpErrorResponse) => {
          this.spinner = false;
          this.messageError = response.error;
        }
      );
    }else{
      console.log(this.settingForm.controls.messageError)
    }
  }
  jQuery(): void {
    $(document).ready(function () {
      const instance = $('.container-setting-profile');
      instance.find('.option-menu').on('click', function (event) {
        const section = $(event.currentTarget).data('section');
        toogleMenu(section);
        resetClass();
        $(event.currentTarget).find('span').addClass('active');

      })
      function resetClass() {
        instance.find('.option-menu').map(function (i, el) {
          $(el).find('span').removeClass('active')
        })
      }
      function toogleMenu(section) {
        const sectionForm = instance.find('.section-form')
        sectionForm.map(function (i, el) {
          const dataSection = $(el).data('section');
          if (dataSection == section) {
            $(el).css('display', 'block')
          } else {
            $(el).css('display', 'none')
          }
        })
      }
    })
  }
}
