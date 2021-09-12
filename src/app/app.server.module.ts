import {APP_INITIALIZER, NgModule} from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {SpinnerService} from './shared/spinner/spinner.service';
import {appInitializer} from './shared/initializer/app.initializer';
import {AuthService} from './core/auth/auth.service';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    SpinnerService
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
