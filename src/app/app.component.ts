import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from './core/ux/animations';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {SpinnerService} from './shared/spinner/spinner.service';
import { Location } from '@angular/common';

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
  currentRoute: string;
  public href: string = "";
  constructor(
    private spinnerService: SpinnerService,
    private titleService: Title,
    private location: Location
    ) {
  }

  ngOnInit(): void {
    this.currentRoute = this.location.path();
    // document.addEventListener('deviceready', () => alert( device.platform ) );
  }
  isHome(): boolean{
    return !(this.currentRoute == '/login' || this.currentRoute == '/signup') 
  }

  prepareRoute(outlet: RouterOutlet) {
    (outlet.activatedRouteData.title && this.titleService.setTitle(outlet.activatedRouteData.title));
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData.animation;
  }
}
