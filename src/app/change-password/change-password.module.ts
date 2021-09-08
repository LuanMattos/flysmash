import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from '../core/core.module';
import {AppRoutingModule} from '../app.routing.module';
import {NgxLoadingModule} from 'ngx-loading';
import {SpinnerService} from '../shared/spinner/spinner.service';
import {VmessageModule} from '../shared/vmessage/vmessage.module';
import {UxModule} from '../core/ux/ux-module';
import {ChangePasswordComponent} from './change-password.component';
import {ConfirmationModule} from "../confirmation/confirmation.module";


@NgModule({

  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    UxModule,
    ConfirmationModule,
  ],
  providers: [
    SpinnerService
  ],
})
export class ChangePasswordModule {
}
