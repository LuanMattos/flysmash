import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from './user';
import {UserService} from './user.service';

@Injectable({providedIn: 'root'})

export class UserResolver implements Resolve<Observable<User>>{

  constructor(private router: Router, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>{
    const userName = route.params.userName;
    return this.userService.getDataUser();
  }


}
