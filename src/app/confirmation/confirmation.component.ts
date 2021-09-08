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
    // this.userName = this.activatedRoute.snapshot.params.userName;

    // this.confirmationForm = this.formBuilder.group({
    //   code: ['', Validators.required]
    // });
  }
  // save(): void{
  //   const code = this.confirmationForm.get('code').value;
  //   if ( !this.confirmationForm.invalid){
  //     this.authService
  //       .verification(code)
  //       .subscribe(
  //         success => {
  //           this.userService.logout();
  //           this.userService.setDataUser([]);
  //           this.router.navigate(['']);
  //         },
  //         error => {
  //           this.alertService.warning('Invalid code! Check spaces, and other accents.');
  //         }
  //       );
  //   }
  // }
}
