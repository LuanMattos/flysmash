import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const API  = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class FollowingService {
  constructor(
    private http: HttpClient
    ) {}
  getFollowingsByUser(user, page: string ): Observable<any>{
    return this.http.post(API + 'get_followings/' + page, {user});
  }

}
