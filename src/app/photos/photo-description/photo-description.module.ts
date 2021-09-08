import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { PhotoDescriptionComponent } from './photo-description.component';

@NgModule({
  declarations:[
    PhotoDescriptionComponent
  ],
  exports:[
    PhotoDescriptionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PhotoDescriptionModule{

}
