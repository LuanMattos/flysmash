import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderHomeModule } from '../header-home/header-home.module';
import { FooterModule } from '../footer/footer.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password.routing.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ForgotPasswordRoutingModule,
    RouterModule,
    FooterModule,
    HeaderHomeModule
  ],
  exports: [
    ForgotPasswordComponent
  ],
  providers: []
})
export class ForgotPasswordModule{}
