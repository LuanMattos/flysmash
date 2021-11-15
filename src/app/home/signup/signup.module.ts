import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderHomeModule } from '../header-home/header-home.module';
import { SignUpComponent } from './signup.component';
import { FooterModule } from '../footer/footer.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { SignupRoutingModule } from './signup.routing.module';
import { VmessageModule } from 'src/app/shared/vmessage/vmessage.module';



@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HeaderHomeModule,
    FooterModule,
    SignupRoutingModule,
    VmessageModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: []
})
export class SignupModule{}
