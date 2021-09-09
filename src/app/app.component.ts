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
    (function (window, document, undefined) {
      'use strict';
      if (!('localStorage' in window)) return;
      var nightMode = localStorage.getItem('gmtNightMode');
      if (nightMode == 'true') {
          document.documentElement.className += ' dark';
      }
  })(window, document);


  (function (window, document, undefined) {

      'use strict';

      // Feature test
      if (!('localStorage' in window)) return;

      // Get our newly insert toggle
      var nightMode = document.querySelector('#night-mode');
      if (!nightMode) return;

      // When clicked, toggle night mode on or off
      nightMode.addEventListener('click', function (event) {
          event.preventDefault();
          document.documentElement.classList.toggle('dark');
          if (document.documentElement.classList.contains('dark')) {
              localStorage.setItem('gmtNightMode', 'true');
              return;
          }
          localStorage.removeItem('gmtNightMode');
      }, false);

  })(window, document);
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
