import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


import {signUpValidator} from '../../shared/validators/fields-signup.validator';
import {UserNotTakenValidatorService} from './user-not-taken.validator.service';
import {SignupService} from './signup.service';
import {AngularFireAuth} from '@angular/fire/auth';

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
  messageError:string;
  colorPasswords:string;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignupService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {}

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
          Validators.pattern(/^[A-z0-9_\-]+$/)
        ],
        [
          // this.userNotTakenValidator.checkUserNameTaken()
        ]
      ],
      lastName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-z0-9_\-]+$/)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          ]
        ],
      confirmPassword: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          ]
        ]
      },
      {
        validator: signUpValidator,
      }
    );
  }

 

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void{
  }

  signUp(): void{
    const newUser = this.signupForm.getRawValue();
    this.colorPasswords = '';
    if (
      (this.signupForm.valid && !this.signupForm.pending) ) {
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
            if(typeof error == 'object'){
              this.messageError = 'E-mail already registered';
            }else{
              this.messageError = error.error;
            }
          }
        );
    }else{
      if(this.signupForm.errors.userNamePassword){
        this.messageError = 'Passwords do not match'
        this.colorPasswords = 'color-input-error'
      }
    }
  }
}
