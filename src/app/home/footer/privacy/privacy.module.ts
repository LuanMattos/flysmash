import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy.routing.module';

@NgModule({
  declarations: [
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrivacyRoutingModule,
  ],
  exports: [
    QuicklinkModule
  ],
  providers: []
})
export class PrivacyModule{}
