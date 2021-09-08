import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SpinnerService} from '../shared/spinner/spinner.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {slideInAnimation} from '../core/ux/animations';
import {AuthService} from '../core/auth/auth.service';
import {AlertService} from "../shared/alert/alert.service";

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class ChangePasswordComponent implements OnInit{
  isSpinnerVisibile$: Observable<boolean> = this.spinnerService.isNavigationPending$;
  changePasswordForm: FormGroup;
  message: string;
  paramUri;

  constructor(
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void{
    this.paramUri = this.activatedRoute.snapshot.params.code;
    if (!this.paramUri){
      this.router.navigate(['']);
      return;
    }
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      repPassword: ['', Validators.required]
    });
  }
  save(): void{
    const data = this.changePasswordForm.getRawValue();
    if (this.changePasswordForm.get('password').value !== this.changePasswordForm.get('repPassword').value){
      this.message = 'Passwords don\'t match!\n';
      return;
    }
    data.code = this.paramUri;
    if ( !this.changePasswordForm.invalid ){
      this.authService
        .changePassword(data)
        .subscribe(
          success => {
           this.message = '';
           this.alertService.success('Success! Log in again to confirm the new identity.\n');
           this.router.navigate(['']);
          },
          error => {
            this.message = error.body;
          }
        );
    }
  }
}
