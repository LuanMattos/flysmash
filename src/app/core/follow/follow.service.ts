import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class FollowService {
  followings$ = new BehaviorSubject<Array<any>>(null);
  followers$ = new BehaviorSubject<Array<any>>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) { }


  get usersFollowings() {
    if (!this.followings$.value) {
      this.getFollowingsByUser().subscribe((data) => { this.followings$.next(data); });
    }
    return this.followings$;
  }
  get usersFollowers() {
    if (!this.followers$.value) {
      this.getFollowersByUser().subscribe((data) => { this.followers$.next(data); });
    }
    return this.followers$;
  }
  removeUserFollowingSubject(userName) {
    const followings: any[] = this.followings$.getValue();
    followings.forEach((item, index) => {
      if (item.users.users_name === userName) { followings.splice(index, 1) }
    });
    followings[0]?this.followings$.next([followings[0]]):this.followings$.next([]);;
    
  }
  addUserFollowingSubject(newData) {
    const value = this.followings$.value;
    this.followings$.next([{"users":newData}, ...this.followings$.value]);
  }
  private getFollowersByUser(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken(),
      'Accept': 'application/json'
    });
    return this.http.post(API + 'users/followers/followers', {},{ headers: httpHeaders });
  }
  private getFollowingsByUser(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken(),
      'Accept': 'application/json'
    });
    return this.http.post(API + 'users/followers/followings', {}, { headers: httpHeaders });
  }
  /** Follow **/
  follow(userName: string): any {
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.http.put(API + 'users/followers', { userName }, { observe: 'response', headers: httpHeaders });
  }

}
