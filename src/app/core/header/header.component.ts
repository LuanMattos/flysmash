import {Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';


import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {WindowRefService} from '../nativejs/windowRef.service';
import {isPlatformBrowser} from '@angular/common';
import {HeaderService} from "./header.service";
import {MatDialog} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  form: FormGroup;
  showHead: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    ) {
      
  }
  ngOnInit(): void{

    this.form = this.formBuilder.group({});
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
  }
 
  
}
