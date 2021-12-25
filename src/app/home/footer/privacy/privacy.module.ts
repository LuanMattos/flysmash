import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy.routing.module';

@NgModule({
  declarations: [
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    QuicklinkModule,
    PrivacyRoutingModule,
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
})
export class PrivacyModule{}
