import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/token/token.service';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { UserService } from '../../core/user/user.service';
import * as jwt_decode from 'jwt-decode';
import { AlertService } from 'src/app/shared/alert/alert.service';
declare var window: any;



@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit, AfterViewInit, OnDestroy {

  loginForm: FormGroup;
  authInvalid: string;
  fromUrl: string;
  messageError: string;
  spinner;
  jwtGoogle;

  @ViewChild('userNameInput') userNameInput: ElementRef;
  submitInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectionService: PlatformDetectorService,
    private alertService: AlertService,
    private ngZone: NgZone
  ) {
    var body = document.getElementsByTagName('body').item(0);
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://accounts.google.com/gsi/client');
    body.appendChild(script)
   }

  ngAfterViewInit(): void {

    window.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '785924330407-95v2q0bkidehh0t2851t3n83kct8jcs5.apps.googleusercontent.com',
        // auto_select: true,
        cancel_on_tap_outside: false,
        callback: (token) => {
          const jwtToken = jwt_decode(token.credential);
          this.jwtGoogle = jwtToken;
          this.ngZone.run(() => this.signUpOrSignInGoogle(this.jwtGoogle) );          
          //   this.handle(token);
        }
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // try next provider if OneTap is not displayed or skipped
        }
      });
    }

  }

  ngOnDestroy(): void {
    const element = document.getElementById("credentials-picker-container");
    if(element){
      element.style.display = 'none'
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.stopRefreshTokenTimer();
      
  }
  signUpOrSignInGoogle(jwtToken): void {
    if (jwtToken && !jwtToken.email_verified) {
      this.alertService.info('E-mail is not verified!');
    } else {
      this.authService.authenticateGoogle(jwtToken)
        .subscribe(
          (res) => {
            this.router.navigateByUrl('feed')            
          },
          error => {
            if (!error.status) {
              this.alertService.info('It looks like you are offline!Try again later')
              return false;
            }
            this.alertService.info(error.error)
            this.router.navigate(['login']);
          }
        );
    }
  }
  login(): void {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.valid && !this.loginForm.pending) {

      this.spinner = true;

      this.authService.authenticate(password, userName)
        .subscribe(
          (res) => {
            this.spinner = false;
            this.router.navigate(['feed']);
          },
          error => {
            if (!error.status) {
              this.messageError = 'It looks like you are offline!Try again later'
              return false;
            }
            this.spinner = false;
            this.messageError = error.error;
            this.router.navigate(['login']);
          }
        );
    }
  }
}
