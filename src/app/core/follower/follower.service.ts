import {Injectable} from '@angular/core';
import {TokenService} from '../token/token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Follower} from './follower';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const API  = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class FollowerService{
  constructor(
    private http: HttpClient
    ) {}
  getFollowersByUser(user, page: string ): Observable<any>{
    return this.http.post(API + 'get_followers/' + page, {user});
  }

}
