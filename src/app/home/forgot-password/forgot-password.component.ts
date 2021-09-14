import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SpinnerService} from '../../shared/spinner/spinner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {slideInAnimation} from '../../core/ux/animations';
import {AuthService} from '../../core/auth/auth.service';
import {UserService} from '../../core/user/user.service';
import {AlertService} from '../../shared/alert/alert.service';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit, OnDestroy{
  isSpinnerVisibile$: Observable<boolean> = this.spinnerService.isNavigationPending$;
  forgotPasswordForm: FormGroup;
  message: string;
  formSubmited: boolean;

  constructor(
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void{
    this.forgotPasswordForm = this.formBuilder.group({
      userNameEmail: ['', Validators.required]
    });
  }
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void{
  }
  save(): void{
    const userNameEmail = this.forgotPasswordForm.get('userNameEmail').value;
    if ( !this.forgotPasswordForm.invalid && !this.formSubmited){
      this.formSubmited = true;
      this.authService
        .forgoutPassword(userNameEmail)
        .subscribe(
          success => {
            this.message = '';
            this.alertService.success(success.body);
          },
          error => {
            this.message = error.body;
            this.forgotPasswordForm.reset();
            this.formSubmited = false;
          }
        );
    }
  }
}
