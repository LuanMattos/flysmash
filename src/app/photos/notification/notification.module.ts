import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations:[
    NotificationComponent
  ],
  exports:[
    NotificationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class NotificationModule{

}
