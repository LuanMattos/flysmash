import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  supportForm: FormGroup;
  spinner;
  messageError;
  text_help;
  count;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.supportForm = this.formBuilder.group({
      text_help: ['', [Validators.required,Validators.maxLength(250),Validators.minLength(10)]],
      email: ['', [Validators.email, Validators.required]]
    });
  }
  save(): void {
    const text_help = this.supportForm.get('text_help').value;
    const email = this.supportForm.get('email').value;

    this.spinner = true;
    this.messageError = '';
    if ( this.supportForm.valid && !this.supportForm.pending ) {
      this.authService
        .sendSupport( email,text_help )
        .subscribe(
          res => {
            if (res.status == 201) {
              this.messageError = res.body;
            } else if (res.status == 200) {
              console.log(res)
              this.alertService.info(res.body);
            } else {
              this.messageError = 'Internal error';
            }
            this.spinner = false;
          },
          error => {
            this.alertService.danger(error.error);
            this.spinner = false;
            this.messageError = error.error;
          }
        );
    } else {
      this.spinner = false;
      if(this.supportForm.get('email').errors){
        this.messageError = "Error, field E-mail is " + this.supportForm.get('email').status.toString().toLowerCase();
      }
      if(this.supportForm.get('text_help').errors){
        this.messageError += "\n Error, field text help " + this.supportForm.get('text_help').status.toString().toLowerCase();
      }
    }
  }
  wordCounter():void{
    this.count = this.supportForm.get('text_help').value.length;
  }
}
