import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
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
    FormsModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: []
})
export class SupportModule{}
