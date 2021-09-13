import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  form: FormGroup;
  showSidebar;
  constructor(
    private formBuilder: FormBuilder,
    ) {
   
  }
  ngOnInit(): void{
    this.form = this.formBuilder.group({});
  }
  
    
}
