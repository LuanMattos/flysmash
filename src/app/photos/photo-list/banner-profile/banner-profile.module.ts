import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerProfileComponent } from './banner-profile.component';
import { SpinnerButtonModule } from 'src/app/shared/spinner-button/spinner-button.module';
import {  iamFollowing } from './i-am-following.pipe';
import { ShowIsLoggedModule } from 'src/app/shared/directives/show-is-logged/show-is-logged.module';


@NgModule({
    declarations: [
        BannerProfileComponent,
        iamFollowing
    ],
    imports: [
        CommonModule,
        RouterModule,
        SpinnerButtonModule,
        ShowIsLoggedModule
    ],
    exports: [
        BannerProfileComponent
    ],
    providers: [

    ],
})
export class BannerProfileModule { }

