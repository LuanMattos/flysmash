import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';


import {SignInComponent} from './signin/signin.component';
import {VmessageModule} from '../shared/vmessage/vmessage.module';
import {SignUpComponent} from './signup/signup.component';
import {HomeComponent} from './home.component';
import {SignupService} from './signup/signup.service';
import {UxModule} from '../core/ux/ux-module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CoreModule} from '../core/core.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderHomeComponent } from './header-home/header-home.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    HomeComponent,
    FooterComponent,
    HeaderHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    UxModule,
    RouterModule,
    CoreModule
  ],
  providers: [SignupService]
})
export class HomeModule{}
