import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { PostsService } from './posts.service';


@Injectable({providedIn: 'root'})

export class PostsExplorerResolver implements Resolve<Observable<User>>{

  constructor(private router: Router, private userService: UserService, private postsService:PostsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>{
    return this.postsService.requestPostsExplorer();
  }
}
