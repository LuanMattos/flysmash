import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ChatComponent} from './chat.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@NgModule({
  declarations:[
    ChatComponent
  ],
  exports: [
    QuicklinkModule
  ],
  providers: [
    SpinnerService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ChatModule{

}
