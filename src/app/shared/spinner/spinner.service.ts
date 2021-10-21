import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Scroll } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators'

@Injectable()
export class SpinnerService {
  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  isNavigationPending$: Observable<boolean> = this.router.events.pipe(
    filter((event: RouterEvent) => this.isConsideredEvent(event)),
    map((event: RouterEvent) => this.isNavigationStart(event)),
    distinctUntilChanged()
  );

  private isConsideredEvent(event: RouterEvent): boolean {
    return this.isNavigationStart(event)
      || this.isNavigationEnd(event);
  }

  private isNavigationStart(event: RouterEvent): boolean {
    return event instanceof NavigationStart;
  }

  private isNavigationEnd(event: RouterEvent): boolean {
    return event instanceof NavigationEnd
      || event instanceof NavigationCancel
      || event instanceof NavigationError;
  }
}
