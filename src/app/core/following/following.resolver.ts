import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Following} from './following';
import {FollowingService} from './following.service';

@Injectable({providedIn: 'root'})

export class FollowingResolver implements Resolve<Observable<Following>>{

  constructor(private router: Router, private followingService: FollowingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Following>{
    this.followingService.getFollowingsByUser(route.params.userName, '0').subscribe( following => {
    }, error => {
      this.router.navigate(['not-found']);
    });
    return this.followingService.getFollowingsByUser(route.params.userName, '0');
  }


}
