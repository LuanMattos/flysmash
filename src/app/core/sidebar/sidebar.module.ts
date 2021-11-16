import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackHistoryModule } from 'src/app/shared/directives/back-history/back-history.module';
import { SidebarComponent } from './sidebar.component';
import { SidebarRoutingModule } from './sidebar.routing.module';

@NgModule({
  declarations: [
      SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BackHistoryModule,
    SidebarRoutingModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: []
})
export class SidebarModule{}
