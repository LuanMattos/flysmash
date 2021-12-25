import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { QuicklinkModule } from 'ngx-quicklink';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { TermsComponent } from './terms.component';
import { TermsRoutingModule } from './terms.routing.module';

@NgModule({
  declarations: [
    TermsComponent,
  ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    QuicklinkModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
})
export class TermsModule{}
