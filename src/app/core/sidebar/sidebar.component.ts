import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  form: FormGroup;
  showSidebar;
  user:User;
  $user: Observable<User>;
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService
    ) {}

  ngOnInit(): void{
    this.form = this.formBuilder.group({});
    this.$user = this.userService.getUser();
  }    
}
