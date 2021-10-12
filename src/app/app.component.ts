import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from './core/ux/animations';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {SpinnerService} from './shared/spinner/spinner.service';
import { $ } from 'dom7';
import { SwUpdate } from '@angular/service-worker';

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
  showHeadSidebar: boolean;
  showSidebar: boolean;
  hideHeader: boolean;
  public href: string = "";
  constructor(
    private spinnerService: SpinnerService,
    private titleService: Title,
    private router: Router,
    private swUpdate: SwUpdate
    ) {}
     

  ngOnInit(): void {
      this.showHideMenuSidebar();
      this.showHideHeader();
      console.log('nova versao denovo')

      if (this.swUpdate.isEnabled) {

        this.swUpdate.available.subscribe(() => {

            if(confirm("New version available. Load New Version?")) {

                window.location.reload();
            }
        });
    }    



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
          alert('teste')
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

  prepareRoute(outlet: RouterOutlet) {
    (outlet.activatedRouteData.title && this.titleService.setTitle(outlet.activatedRouteData.title));
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData.animation;
  }
  showHideHeader(){    
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if ( event['url'] == '/add' || event['urlAfterRedirects'] == '/add' ){
          this.hideHeader=true;
        }else{
          this.hideHeader=false;
        }
      }
    })
  }
  showHideMenuSidebar(){
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event['url'] == '/login' ||
          event['urlAfterRedirects'] == '/login' ||
          event['url'] == '/signup' ||
          event['urlAfterRedirects'] == '/signup' ||
          event['url'] == '/not-found' ||
          event['urlAfterRedirects'] == '/not-found' ||
          event['url'] == '/privacy' ||
          event['urlAfterRedirects'] == '/privacy' ||
          event['url'] == '/terms' ||
          event['urlAfterRedirects'] == '/terms' ||
          event['url'] == '/about' ||
          event['urlAfterRedirects'] == '/about' ||
          event['url'] == '/forgot-password' ||
          event['urlAfterRedirects'] == '/forgot-password' ||
          event['url'] == '/confirmation' ||
          event['urlAfterRedirects'] == '/confirmation' ||
          event['url'] == '/change-password' ||
          event['urlAfterRedirects'] == '/change-password' ||
          event['urlAfterRedirects'] == '/search'
          ) {
          this.showHeadSidebar = false;
        } else {
          this.showSidebar = true;
          this.showHeadSidebar = true;
        }
        $('#wrapper').removeClass('sidebar-active')
        $('#wrapper').find('.header_inner').trigger('click')
      }
    });
  }
}
