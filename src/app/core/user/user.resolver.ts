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
    if (this.userService.isLogged()) {
      this.userService.dataUserBasic(userName).subscribe(user => {
        this.userService
          .verifiedAccount()
          .subscribe(verified => {
            if (!verified) {
              user.verified = false;
            } else {
              user.verified = true;
            }
          });
        this.userService.setDataUser(user);
      }, error => {
        this.userService.logout();
        this.router.navigate(['']);
      });
      return this.userService.dataUserBasic(userName);
    }else{
      this.userService.dataUserBasicNotAuth(userName).subscribe(user => {
        this.userService.setDataUser(user);
      }, error => {
        this.userService.logout();
        this.router.navigate(['']);
      });
      return this.userService.dataUserBasicNotAuth(userName);
    }
  }


}
