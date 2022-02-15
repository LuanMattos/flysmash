import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {UserService} from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthRequiredGuard implements CanActivate{
  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any{
    const userName = route.params.userName;
    if (!this.userService.isLogged() && userName){
      return true;
    }else if (!this.userService.isLogged() && !userName){
      this.router.navigate(['/']);
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
