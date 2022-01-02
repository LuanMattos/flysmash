
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppRoutingModule} from './app.routing.module';
import {AppComponent} from './app.component';
import {SpinnerService} from './shared/spinner/spinner.service';
import {NgxLoadingModule} from 'ngx-loading';
import {environment} from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './core/auth/request.interceptor';
import { HeaderModule } from './core/header/header.module';
import { SidebarModule } from './core/sidebar/sidebar.module';
import { AlertModule } from './shared/alert/alert.module';
// import { initializeApp } from 'firebase/app';
// const app = initializeApp(environment.firabase);

@NgModule({

  declarations: [
    AppComponent,
  ],
  imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        AppRoutingModule,
        SidebarModule,
        HeaderModule,
        AlertModule,
        BrowserAnimationsModule,
        NgxLoadingModule.forRoot({}),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    SpinnerService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

