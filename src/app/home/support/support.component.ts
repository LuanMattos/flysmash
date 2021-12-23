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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.supportForm = this.formBuilder.group({
      text_help: ['', [Validators.required, Validators.pattern(/^[A-z0-9_\-]+$/)]],
      email: ['', [Validators.email, Validators.email]]
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
              this.alertService.info(res.body);
            } else {
              this.messageError = 'Internal error';
            }
            this.spinner = false;
          },
          error => {
            this.spinner = false;
            this.messageError = 'Internal error a';
          }
        );
    } else {
      this.spinner = false;
      const errors = this.supportForm.get('code').errors;
      if (errors.required) {
        this.messageError = 'Code is required';
      } else if (errors.pattern) {
        this.messageError = 'Code is invalid!';
      }
    }
  }
}
