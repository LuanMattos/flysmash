import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/user/user.service';
import {Router} from '@angular/router';
import {TokenService} from '../../core/token/token.service';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router,
    private user: UserService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logout(): void{
    this.user.logout();
    this.router.navigate(['']);
  }

}
