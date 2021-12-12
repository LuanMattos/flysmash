import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { SignInComponent } from './signin.component';
import { RouterModule } from '@angular/router';
import { SigninRoutingModule } from './signin.routing.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { HeaderHomeModule } from '../header-home/header-home.module';
import { FooterModule } from '../footer/footer.module';
import { ForgotPasswordModule } from '../forgot-password/forgot-password.module';
import { VmessageModule } from 'src/app/shared/vmessage/vmessage.module';



@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SigninRoutingModule,
    RouterModule,
    QuicklinkModule,
    HeaderHomeModule,
    FooterModule,
    // AnimationLoginModule,
    ForgotPasswordModule,
    VmessageModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: []
})
export class SigninModule{}
