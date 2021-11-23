import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {PhotoComponent} from './photo.component';
import { ModalModule } from 'src/app/shared/modal/modal.module';

@NgModule({
  declarations:[
    PhotoComponent
  ],
  exports:[
    PhotoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule,
  ]
})
export class PhotoModule{

}
