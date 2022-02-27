import { Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';


import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { WindowRefService } from '../nativejs/windowRef.service';
import { isPlatformBrowser } from '@angular/common';
import { HeaderService } from "./header.service";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../token/token.service';
import { SearchService } from '../search/search.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  form: FormGroup;
  showHead: boolean;
  user: User;
  isLogged: boolean;
  hideHeader: boolean;
  users: User[] = [];
  debounce:Subject<string> = new Subject<string>();
  value:string = '';
  hasMore = true;
  filter:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private searchService: SearchService,
  ) {

  }
  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => this.user = user);
    this.isLogged = this.userService.isLogged();
    this.form = this.formBuilder.group({});
    this.nativeJS();

    this.debounce
    .pipe( debounceTime( 500 ) )
    .subscribe(filter => 
      {
        this._filter( filter );
      }
    );

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        const el = (<any>document.querySelector('.--result-search-header'));
        if(el){
          el.style.display = 'none'
        }
        this.clearInput();
      }
    })

   
  }
  nativeJS():  any{
    (function (window, document, undefined) {
      'use strict';
      if (!('localStorage' in window)) return;
      var nightModeLocalStorage = localStorage.getItem('gmtNightMode');
      if (nightModeLocalStorage == 'true') {
        document.documentElement.className += ' dark';
      }

      // Feature test
      if (!('localStorage' in window)) return;

      // Get our newly insert toggle
      var nightMode = document.querySelector('.night-mode');
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
  }
  logout(): any {
    this.userService.logout();
  }
  _filter(value): any {

    if (!value) {
      this.users = [];
      return false;
    }
    this.searchService.getUserByName(value)
      .pipe(debounceTime(300))
      .subscribe(response => {
        this.users = response.body;
      }
      );
  }
  clearInput(): void{
    this.users = [];
    (<any>document.getElementById('autocomplete-input-header')).value = '';
    this.debounce.next('');
  }
  moreUsers(): void{
    this.searchService.getUserByNamePaginated( this.filter, this.users.length )
      .subscribe(users => {
        this.users = this.users.concat(users);
        if (!users.length){ this.hasMore = false; }
      });
  }

}
