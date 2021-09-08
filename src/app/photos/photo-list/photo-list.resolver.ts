import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {PhotoService} from '../photo/photo.service';
import {Photo} from '../photo/photo';
import {UserService} from '../../core/user/user.service';

@Injectable({providedIn: 'root'})

export class PhotoListResolver implements Resolve<Observable<Photo[]>>{

  constructor(private router: Router, private service: PhotoService, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]>{
      const userName = route.params.userName;
      this.service.listFromUser(userName).subscribe(() => {}, error => {
        this.router.navigate(['not-found']);
      });
      return this.service.listFromUser(userName);
  }


}
