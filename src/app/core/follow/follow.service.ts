import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class FollowService {
  constructor(
    private http: HttpClient
  ) { }

  getFollowersByUser(user, page: string): Observable<any> {
    return this.http.post(API + 'get_followers/' + page, { user });
  }
  getFollowingsByUser(user, page: string): Observable<any> {
    return this.http.post(API + 'get_followings/' + page, { user });
  }
  /** Follow **/
  follow(userId: number): Observable<boolean> {
    return this.http.put<boolean>(API + 'follow/' + userId, {}, { responseType: 'json' });
  }

}
