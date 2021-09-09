import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  form: FormGroup;

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
