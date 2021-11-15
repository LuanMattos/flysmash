import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { HeaderHomeModule } from '../header-home/header-home.module';
import { FooterModule } from '../footer/footer.module';
import { AnimationLoginComponent } from './animation-login.component';



@NgModule({
  declarations: [
    AnimationLoginComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AnimationLoginComponent
  ],
  providers: []
})
export class AnimationLoginModule{}
