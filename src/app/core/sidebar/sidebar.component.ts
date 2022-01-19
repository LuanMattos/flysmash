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
  toggleSidebar;

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
    const instance = $('.sidebar_inner');
    $(document).ready(function () {
      $('.btn-close-menu').on('click', function () {
        $('.sidebar').removeClass('sidebar-active');
        $('#wrapper').removeClass('sidebar-active')
      })
      $('.icon-menu').on('click', function () {
        $('.sidebar').addClass('sidebar-active');
        $('#wrapper').addClass('sidebar-active')
      })
    })

    instance.find('ul li').on('click',function(){
      $('.sidebar').removeClass('sidebar-active');
      $('#wrapper').removeClass('sidebar-active');
    })
  }
  logout(): any {
    this.userService.logout();
  }
}
