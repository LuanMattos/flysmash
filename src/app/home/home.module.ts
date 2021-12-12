import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { QuicklinkModule } from 'ngx-quicklink';



import {VmessageModule} from '../shared/vmessage/vmessage.module';
import {HomeComponent} from './home.component';
import {SignupService} from './signup/signup.service';
import { HomeRoutingModule } from './home.routing.module';
import { HeaderHomeModule } from './header-home/header-home.module';

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


