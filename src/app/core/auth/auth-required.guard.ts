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
      this.router.navigate(['login']);
      return false;
    }

    // this.userService.getUser().subscribe( user => {
        // this.router.navigate(['login']);
    // });

    return true;
  }
}
