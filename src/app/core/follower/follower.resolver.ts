import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Follower} from './follower';
import {FollowerService} from './follower.service';

@Injectable({providedIn: 'root'})

export class FollowerResolver implements Resolve<Observable<Follower>>{

  constructor(private router: Router, private followerService: FollowerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Follower>{
    this.followerService.getFollowersByUser(route.params.userName, '0').subscribe( follower => {
    }, error => {
      this.router.navigate(['not-found']);
    });
    return this.followerService.getFollowersByUser(route.params.userName, '0');
  }


}
