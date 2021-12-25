import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CoreModule} from '../core/core.module';
import {AppRoutingModule} from '../app.routing.module';
import {ConfirmationComponent} from './confirmation.component';
import {NgxLoadingModule} from 'ngx-loading';
import {SpinnerService} from '../shared/spinner/spinner.service';
import {VmessageModule} from '../shared/vmessage/vmessage.module';
import {UxModule} from '../core/ux/ux-module';
import { ConfirmationRoutingModule } from './confirmation.routing.module';
import { PhotoListModule } from '../photos/photo-list/photo-list.module';
import { QuicklinkModule } from 'ngx-quicklink';


@NgModule({

    declarations: [
        ConfirmationComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        // NgxLoadingModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule,
        VmessageModule,
        UxModule,
        QuicklinkModule,
        ConfirmationRoutingModule
    ],
    providers: [
        // SpinnerService
    ],
    exports: [
        QuicklinkModule
    ]
})
export class ConfirmationModule {
}
