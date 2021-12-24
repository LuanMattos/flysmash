import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { signUpValidator } from '../../shared/validators/fields-signup.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit, AfterViewInit, OnDestroy {

  signupForm: FormGroup;
  @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement>;
  authInvalid: string;
  spinner;
  messageError: string;
  colorPasswords: string;
  account_validation_messages = {
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
    'email': [
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
    'terms': [
      { type: 'required', message: 'You must accept terms and conditions' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignupService,
    private router: Router,
    private userNotTakenValidator:UserNotTakenValidatorService
  ) { }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          // this.userNotTakenValidator.checkUserEmailTaken()
        ]
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-z_\-]+$/)
        ]
      ],
      lastName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-z_\-]+$/)
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
      terms: [false,
          Validators.requiredTrue,
      ]
    },
      {
        validator: signUpValidator,
      }
    );
  }



  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  signUp(): void {
    const newUser = this.signupForm.getRawValue();
    this.colorPasswords = '';
    if (
      (this.signupForm.valid && !this.signupForm.pending)) {
      this.spinner = true;

      this.signUpService
        .newUser(newUser)
        .subscribe(
          (success) => {
            this.spinner = false;
            this.router.navigate(['confirmation']);
          },
          error => {
            this.spinner = false;
            if (typeof error == 'object') {
              this.messageError = 'E-mail already registered';
            } else {
              this.messageError = error.error;
            }
          }
        );
    }else{
      Object.keys(this.account_validation_messages).forEach((i,l)=>{
        console.log(i)
        console.log(l)
        // this.signupForm.hasError(key.type)
        // this.messageError = ''
      });
      
    }
  }
  getFormValidationErrors() {
    Object.keys(this.signupForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.signupForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}

