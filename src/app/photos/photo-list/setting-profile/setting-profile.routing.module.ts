import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { SettingProfileComponent } from './setting-profile.component';

const routes: Routes = [
    {
        path: '',
        component: SettingProfileComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
            // user: UserResolver
        },
        data: {
            animation: 'HomePage',
            title: 'Setting profile'
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingProfileRoutingModule {

}