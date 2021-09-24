import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


import {fieldsSignupValidator} from '../../shared/validators/fields-signup.validator';
import {UserNotTakenValidatorService} from './user-not-taken.validator.service';
import {NewUser} from './new-user.interface';
import {SignupService} from './signup.service';
import {PlatformDetectorService} from '../../core/platform-detector/platform-detector.service';
import {userNamePassword} from '../../shared/validators/fields-signin.validator';
import {AlertService} from '../../shared/alert/alert.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../../core/user/user.service';
import {AuthService} from '../../core/auth/auth.service';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit, AfterViewInit, OnDestroy {

  signupForm: FormGroup;
  @ViewChild('inputEmail') inputEmail: ElementRef<HTMLInputElement>;
  classButton = '';
  blockSubmited: boolean = false;
  authInvalid: string;

  constructor(
    private userNotTakenValidator: UserNotTakenValidatorService,
    private formBuilder: FormBuilder,
    private signUpService: SignupService,
    private router: Router,
    private platformDetectionService: PlatformDetectorService,
    private alertService: AlertService,
    public afAuth: AngularFireAuth,
    private userService: UserService,
    private authService: AuthService,
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
          this.userNotTakenValidator.checkUserEmailTaken()
        ]
      ],
      userName: [
        '',
        [
          fieldsSignupValidator,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-z0-9_\-]+$/)
        ],
        [
          this.userNotTakenValidator.checkUserNameTaken()
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
          ]
        ]
      },
      {
        validator: userNamePassword
      }
    );
  }

  GoogleAuth(): any {
    return this.signInSignUpGoogle(new GoogleAuthProvider());
  }
  signInSignUpGoogle(provider): any {
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        const isNewUser = result.additionalUserInfo.isNewUser,
          profile = result.additionalUserInfo.profile;
        this.signUpOrSignInGoogle(profile, isNewUser);
      }).catch((err) => {
      this.authInvalid = 'Error try later';
    });
  }
  signUpOrSignInGoogle( data, isNewUser ): any{
    this.authService.authenticateWithGoogle(data, isNewUser).subscribe(
      (res) => {
        this.authInvalid = '';
        this.authInvalid = res.body;
        this.blockSubmited = false;
        this.userService.getUserByToken().subscribe(response => {
          if (response?.users_name){
            this.router.navigate(['timeline', response.users_name]);
          }
        });
      },
      error => {
        this.blockSubmited = false;
        this.authInvalid = 'Error try later';
      }
    );
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void{
  }

  signUp(): void{
    const newUser = this.signupForm.getRawValue() as NewUser;
    if (this.signupForm.valid && !this.signupForm.pending && !this.classButton) {
      this.classButton = 'disabled';
      this.signUpService
        .newUser(newUser)
        .subscribe(
          () => {
            this.alertService.success('Congratulations! Soon you will receive an E-mail with a confirmation code. Don\'t forget to check your spam box.\n');
            this.router.navigate(['']);
          },
          err => {
            this.classButton = '';
            this.alertService.danger(err.message);
          }
        );
    }
  }

}
