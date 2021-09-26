import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';

import {UserService} from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthRequiredGuard implements CanActivate{
  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  canActivate(): any{
    if (!this.userService.isLogged()){
       this.userService.logout();
      return false;
    }else if( this.userService.isLogged() && this.userService.isVerified() ){
      return true;
    }else if( !this.userService.isVerified() ){
      this.router.navigate(['confirmation']);
      return false;
    }
    return false;   
  }
}
