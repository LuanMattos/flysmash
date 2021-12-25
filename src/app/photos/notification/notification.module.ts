import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { NotificationComponent } from './notification.component';
import { NotificationRoutingModule } from './notification.routing.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@NgModule({
  declarations:[
    NotificationComponent
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    QuicklinkModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule{

}
