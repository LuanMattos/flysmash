import {Injectable} from '@angular/core';
import {TokenService} from '../token/token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';
import * as jwt_decode from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

const API  = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class UserService{

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
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

  getUser(): Observable<User>{
    return this.userSubject.asObservable();
  }

  private decodeAndNotify(): void{
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;

    this.userName = user.users_name;

    this.userSubject.next(user);

  }

  logout(): void{
    this.tokenService.removeToken();
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  isLogged(): boolean{
    return this.tokenService.hasToken();
  }
  getDataUser(): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.http.get<any>(API + 'users', {headers:httpHeaders});
  }
  getUserName(): string{
    return this.userName;
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
