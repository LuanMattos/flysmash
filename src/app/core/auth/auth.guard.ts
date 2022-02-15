import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {UserService} from "../user/user.service";
import {Observable} from "rxjs";
// Autenticação de nível de aplicação, será feito aqui a autenticação da api por exemplo
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

  constructor(
    private router:Router,
    private userService:UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ){

    if(this.userService.isLogged() && this.userService.isVerified()){
      this.router.navigate(['feed'],{})
      return false;
    }
    return true;
  }
}
