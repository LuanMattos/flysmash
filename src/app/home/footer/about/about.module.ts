import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about.routing.module';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    RouterModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: []
})
export class AboutModule{}
