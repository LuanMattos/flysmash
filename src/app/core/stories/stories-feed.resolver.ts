import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { UserService } from '../user/user.service';
import { StoriesService } from './stories.service';


@Injectable({providedIn: 'root'})

export class StoriesFeedResolver implements Resolve<Observable<any>>{

  constructor(
     private router: Router,
     private userService: UserService,
     private storiesService: StoriesService,
     ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    const userName = route.params.userName;
    if(this.userService.isLogged()){
        return this.storiesService.requestStories();
    }
    return null;
  }
}
