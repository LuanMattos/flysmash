import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {UserService} from '../user/user.service';
import {environment} from '../../../environments/environment';
import {TokenService} from '../token/token.service';
import {User} from '../user/user';
import * as jwt_decode from 'jwt-decode';


const API_URL = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private refreshTokenTimeout;
  constructor(
    private  http: HttpClient,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  authenticate(users_password: string, users_email: string): any{
    const data = {users_password, users_email};
    const headers = { 
      // 'Content-Length':'20166',
      // 'Host':'http://localhost:4200'
    }  
    const body=JSON.stringify(data);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer validToke.' 
    });
    return this.http
      .post(API_URL + 'oauth', body, {observe: 'response',headers:httpHeaders})
      .pipe(
        tap(
          res => {
            const authToken = res.headers.get('x-access-token');
            if (authToken){
              this.userService.setToken(authToken);
              this.startRefreshTokenTimer();
            }
          }
        )
      );
  }
  authenticateWithGoogle(data, isNewUser): any{
    const dataUser = {data, isNewUser};
    return this.http
      .post(API_URL + 'auth_google', JSON.stringify(dataUser), {observe: 'response'})
      .pipe(
        tap(
          res => {
            const authToken = res.headers.get('x-access-token');
            if (authToken){
              this.userService.setToken(authToken);
              this.startRefreshTokenTimer();
            }
          }
        )
      );
  }
  refreshToken(): any {
    return this.http.post<any>(`${environment.ApiUrl}valid`, {}, {observe: 'response'})
      .pipe(map((res) => {
        const authToken = res.headers.get('x-access-token');
        if (authToken){
          this.userService.setToken(authToken);
        }
        this.startRefreshTokenTimer();
        return res;
        }
      )
    );
  }
  stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
  private startRefreshTokenTimer(): any {
    this.tokenService.getToken();
    const token = this.tokenService.getToken();
    const jwtToken = jwt_decode(token) as User;
    const timeout = jwtToken.time_expire * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }
  verification(code: string): any{
    return this.http.post(API_URL + 'verify', JSON.stringify(code), {observe: 'response'});
  }
  forgoutPassword(userNameEmail: string): any{
    return this.http.post(API_URL + 'forgot', JSON.stringify(userNameEmail), {observe: 'response'});
  }
  changePassword(data: string ): any{
    return this.http.post(API_URL + 'change_pass', JSON.stringify(data), {observe: 'response'});
  }
}
