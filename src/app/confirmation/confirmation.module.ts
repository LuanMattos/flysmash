import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from '../core/core.module';
import {AppRoutingModule} from '../app.routing.module';
import {ConfirmationComponent} from './confirmation.component';
import {NgxLoadingModule} from 'ngx-loading';
import {SpinnerService} from '../shared/spinner/spinner.service';
import {VmessageModule} from '../shared/vmessage/vmessage.module';
import {UxModule} from '../core/ux/ux-module';
import {LasVegasComponent} from "./animation/las-vegas.component";


@NgModule({

    declarations: [
        ConfirmationComponent,
        LasVegasComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        NgxLoadingModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule,
        VmessageModule,
        UxModule,
    ],
    providers: [
        SpinnerService
    ],
    exports: [
        LasVegasComponent
    ]
})
export class ConfirmationModule {
}
