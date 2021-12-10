
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { ArComponent } from './ar.component';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';
import { RouterModule } from '@angular/router';
import { ArRoutingModule } from './ar.routing.module';
import 'aframe';

@NgModule({
  declarations: [
      ArComponent
  ],
  imports: [
      CommonModule,
      RouterModule,
      ArRoutingModule
  ],
  exports: [
    QuicklinkModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ArModule {
}

