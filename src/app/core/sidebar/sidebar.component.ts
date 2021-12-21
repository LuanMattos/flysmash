import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import $ from "jquery";



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  form: FormGroup;
  showSidebar;
  user: User;
  $user: Observable<User>;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.$user = this.userService.getUser();
    this.functionsMenu();
  }
  functionsMenu(): void {
    $('.sidebar_inner ul li a').on('click', function (e) {
      if ($(this).closest("li").children("ul").length) {
        if ($(this).closest("li").is(".active-submenu")) {
          $('.sidebar_inner ul li').removeClass('active-submenu');
        } else {
          $('.sidebar_inner ul li').removeClass('active-submenu');
          $(this).parent('li').addClass('active-submenu');
        }
        e.preventDefault();
      }
    });
  }
  logout(): any{
    this.userService.logout();
  }
}
