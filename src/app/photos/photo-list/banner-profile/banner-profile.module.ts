import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerProfileComponent } from './banner-profile.component';
import { SpinnerButtonModule } from 'src/app/shared/spinner-button/spinner-button.module';
import {  iamFollowing } from './i-am-following.pipe';


@NgModule({
    declarations: [
        BannerProfileComponent,
        iamFollowing
    ],
    imports: [
        CommonModule,
        RouterModule,
        SpinnerButtonModule,
    ],
    exports: [
        BannerProfileComponent
    ],
    providers: [

    ],
})
export class BannerProfileModule { }

