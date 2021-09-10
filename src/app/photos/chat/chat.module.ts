import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ChatComponent} from './chat.component';

@NgModule({
  declarations:[
    ChatComponent
  ],
  exports:[
    ChatComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ChatModule{

}
