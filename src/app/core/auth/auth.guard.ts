import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {UserService} from "../user/user.service";
import {Observable} from "rxjs";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

  constructor(
    private router:Router,
    private userService:UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ){

    if(this.userService.isLogged()){
      this.router.navigate(
        ['i', this.userService.getUserName() ],
        {
        }
      )
      return false;
    }
    return true;
  }
}
