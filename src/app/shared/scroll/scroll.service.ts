import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ScrollService {
 constructor(private router: Router, private viewportScroller: ViewportScroller) {}
  
 scrollUpdate(): void {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      localStorage.setItem(this.router.url, [0, y].toString())
    });

    const localStorageArray = localStorage.getItem(this.router.url).split(',');
    const scrollArrayInt: any = localStorageArray.map((x)=>{return parseInt(x)})
    setTimeout(() => {
      this.viewportScroller.scrollToPosition(scrollArrayInt);
      }
    )
  }
}
