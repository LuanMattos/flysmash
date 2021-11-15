import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { QuicklinkModule } from 'ngx-quicklink';



import {VmessageModule} from '../shared/vmessage/vmessage.module';
import {SignUpComponent} from './signup/signup.component';
import {HomeComponent} from './home.component';
import {SignupService} from './signup/signup.service';
import {UxModule} from '../core/ux/ux-module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CoreModule} from '../core/core.module';
import { FooterComponent } from './footer/footer.component';
import { AnimationLoginComponent } from './animation-login/animation-login.component';
import { HomeRoutingModule } from './home.routing.module';
import { HeaderHomeModule } from './header-home/header-home.module';
import { SignupModule } from './signup/signup.module';
import { AnimationLoginModule } from './animation-login/animation-login.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    RouterModule,
    HomeRoutingModule,
    QuicklinkModule,
    HeaderHomeModule,
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [SignupService]
})
export class HomeModule{}
