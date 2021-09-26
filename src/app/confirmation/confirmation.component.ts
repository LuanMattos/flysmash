import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SpinnerService} from '../shared/spinner/spinner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {slideInAnimation} from '../core/ux/animations';
import {AuthService} from '../core/auth/auth.service';
import {UserService} from '../core/user/user.service';
import {AlertService} from "../shared/alert/alert.service";

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class ConfirmationComponent implements OnInit{
  isSpinnerVisibile$: Observable<boolean> = this.spinnerService.isNavigationPending$;
  userName: string;
  confirmationForm: FormGroup;
  messageError:string;
  spinner;

  constructor(
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService:UserService
  ) {}

  ngOnInit(): void{
    // this.userName = this.activatedRoute.snapshot.params.userName;

    this.confirmationForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(/^[A-z0-9_\-]+$/) ]]
    });
  }
  save(): void{
    const code = this.confirmationForm.get('code').value;
    this.spinner = true;
    this.messageError = '';
    if ( !this.confirmationForm.invalid){
      this.authService
        .verification(code)
        .subscribe(
          res => {
            if(res.status == 201){
              this.messageError = res.body;
            }else if(res.status == 200){
              this.router.navigate(['feed']);
            }else{
              this.messageError = 'Internal error';
            }
            this.spinner = false;
          },
          error => {
            console.log(error)
            this.spinner = false;
            this.messageError = 'Internal error a';
          }
        );
    }else{
      this.spinner = false;
      const errors = this.confirmationForm.get('code').errors;
      if( errors.required ){
        this.messageError = 'Code is required';
      }else if( errors.pattern ){
        this.messageError = 'Code is invalid!';
      }
    }
  }
}
