import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { QuicklinkModule } from 'ngx-quicklink';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { SettingProfileComponent } from './setting-profile.component';
import { SettingProfileRoutingModule } from './setting-profile.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from 'src/app/shared/vmessage/vmessage.module';

@NgModule({
  declarations:[
    SettingProfileComponent
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
    SettingProfileRoutingModule,
    ReactiveFormsModule,
    VmessageModule
  ]
})
export class SettingProfileModule{

}
