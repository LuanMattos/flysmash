import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router,NavigationEnd  } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  constructor() {
   
  }
  ngOnInit(): void {
  }
}
