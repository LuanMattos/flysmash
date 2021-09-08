import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

import {AuthService} from '../../core/auth/auth.service';
import {PlatformDetectorService} from '../../core/platform-detector/platform-detector.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {UserService} from '../../core/user/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit, AfterViewInit, OnDestroy{

  loginForm: FormGroup;
  authInvalid: string;
  fromUrl: string;
  blockSubmited: boolean = false;

  @ViewChild('userNameInput') userNameInput: ElementRef;
  submitInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectionService: PlatformDetectorService,
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void{
  }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.authService.stopRefreshTokenTimer();
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
          if (response?.user_name){
            this.router.navigate(['timeline', response.user_name]);
          }
        });
      },
      error => {
        this.blockSubmited = false;
        this.authInvalid = 'Error try later';
      }
    );
  }
  login(): void{
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.blockSubmited = true;

    if ( this.loginForm.valid && !this.loginForm.pending) {

      this.authService.authenticate(userName, password)
        .subscribe(
          (res) => {
            this.authInvalid = '';
            const verification = res.body?.user_code_verification;
            if (verification) {
              this.router.navigate(['confirmation', userName]);
            } else {
              this.router.navigate(['timeline', userName]);
            }
            this.authInvalid = res.body;
            this.blockSubmited = false;
            // this.platformDetectionService.isPlatformBrowser()
            // && this.userNameInput.nativeElement.focus();
          },
          error => {
            this.blockSubmited = false;
            this.authInvalid = 'Error try later';
        }
      );
    }
  }
}
