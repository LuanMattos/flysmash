import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { VmessageModule } from 'src/app/shared/vmessage/vmessage.module';
import { SupportComponent } from './support.component';
import { SupportRoutingModule } from './support.routing.module';

@NgModule({
  declarations: [
    SupportComponent,
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    QuicklinkModule,
    VmessageModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
})
export class SupportModule{}
