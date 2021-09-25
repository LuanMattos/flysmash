import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { PhotoMainComponent } from './photo-main.component';

@NgModule({
  declarations:[
    PhotoMainComponent
  ],
  exports:[
    PhotoMainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PhotoMainModule{}
