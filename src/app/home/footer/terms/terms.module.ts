import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { QuicklinkModule } from 'ngx-quicklink';
import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms.routing.module';

@NgModule({
  declarations: [
    TermsComponent,
  ],
  imports: [
    CommonModule,
    TermsRoutingModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: []
})
export class TermsModule{}
