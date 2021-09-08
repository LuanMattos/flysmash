import {Injectable} from '@angular/core';
import {TokenService} from '../token/token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';
import * as jwt_decode from 'jwt-decode';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';

const API  = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class UserService{

  private userSubject = new BehaviorSubject<User>(null);
  private user = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken( token: string ): void{
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }
  getUserByToken(): Observable<any>{
    return this.userSubject.asObservable();
  }
  setDataUser( data ): void{
    this.user.next(data);
  }
  getUser(): Observable<User>{
    return this.user.asObservable();
  }

  private decodeAndNotify(): void{
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;

    this.userName = user.user_name;

    this.userSubject.next(user);

  }

  logout(): void{
    this.http.post<any>(API + 'close', {}).subscribe();
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged(): boolean{
    return this.tokenService.hasToken();
  }
  verifiedAccount(): Observable<any>{
    return this.http.post<any>(API + 'account_is_verify', {});
  }
  getUserName(): string{
    return this.userName;
  }
  dataUserBasic(userName: string): any{
     return this.http.post<any>(API + 'data_user_basic/' + userName, false);
  }
  dataUserBasicNotAuth(userName: string): any{
     return this.http.post<any>(API + 'data_user_basic_not_auth/' + userName, false);
  }
  saveSettings( data ): Observable<any>{
    return this.http.post(API + 'save_setting', data);
  }
  uploadImgProfile( file: File ): Observable<any>{
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.http.post(API + 'upload_img_profile', formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );
  }
  uploadImgCover(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.http.post(API + 'upload_img_cover', formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );
  }

  getFollowersByUser(): Observable<any>{
    return this.http.post(API + 'get_followers', {});
  }

}
