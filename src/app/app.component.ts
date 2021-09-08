import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from './core/ux/animations';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {SpinnerService} from './shared/spinner/spinner.service';
declare var device;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  isSpinnerVisibile$: Observable<boolean> = this.spinnerService.isNavigationPending$;

  constructor(
    private spinnerService: SpinnerService,
    private titleService: Title) {
  }

  ngOnInit(): void {
    document.addEventListener('deviceready', () => alert( device.platform ) );
  }

  prepareRoute(outlet: RouterOutlet) {
    (outlet.activatedRouteData.title && this.titleService.setTitle(outlet.activatedRouteData.title));
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData.animation;
  }
}
