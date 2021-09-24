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
  messageError:string;

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
        this.userService.getUserByToken().subscribe(response => {
          if (response?.users_name){
            this.router.navigate(['timeline', response.users_name]);
          }
        });
      },
      error => {
        this.authInvalid = 'Error try later';
      }
    );
  }
  login(): void{
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    if ( this.loginForm.valid && !this.loginForm.pending) {

      this.authService.authenticate(password, userName)
        .subscribe(
          (res) => {  
            // console.log(res)
              this.router.navigate(['feed']);
          },
          error => {
            this.messageError = error.error;
            this.router.navigate(['login']);
        }
      );
    }
  }
}
