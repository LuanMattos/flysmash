import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CoreModule} from '../core/core.module';
import {NgxLoadingModule} from 'ngx-loading';
import {SpinnerService} from '../shared/spinner/spinner.service';
import {VmessageModule} from '../shared/vmessage/vmessage.module';
import {UxModule} from '../core/ux/ux-module';
import {ChangePasswordComponent} from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password.routing.module';
import { QuicklinkModule } from 'ngx-quicklink';


@NgModule({

  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    UxModule,
    QuicklinkModule,
    ChangePasswordRoutingModule
  ],
  providers: [
    SpinnerService
  ],
  exports:[
    QuicklinkModule
  ]
})
export class ChangePasswordModule {
}
