import {Injectable} from '@angular/core';
import {TokenService} from '../token/token.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';
import * as jwt_decode from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';

const API  = environment.ApiUrl;
const APIV2  = environment.ApiUrlV2;

@Injectable({providedIn: 'root'})

export class UserService{

  private userSubject$ = new BehaviorSubject<User>(null);
  private userName: string;
  private userIsVerified: boolean;

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
    return this.userSubject$.asObservable();
  }
  getUser(): Observable<User>{
    return this.userSubject$.asObservable();
  }
  updateAvatarUserSubject( newUrl, authToken ): void{
    const currentValue = this.userSubject$.value;

    const currentToken = this.tokenService.getToken()
    const newUserTokenDecoded = jwt_decode( currentToken ) as User;
    newUserTokenDecoded.users_avatar = newUrl;

    this.tokenService.setToken(authToken);

    this.userSubject$.next(newUserTokenDecoded);
  }
  logout(): void{
    this.tokenService.removeToken();
    this.userSubject$.next(null);
    this.router.navigate(['/']);
  }
  isLogged(): boolean{
    return this.tokenService.hasToken();
  }
  getDataUser(): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.http.get<any>(API + 'users', {headers:httpHeaders}).pipe(
      tap(
        success =>{},
        error => {
          this.logout();
        }
      )
    );
  }
  getDataUserNoAuth(usersName:string): Observable<any>{
    const httpHeaders = new HttpHeaders({
    });
    return this.http.get<any>(APIV2 + 'users/'+usersName, {observe: 'response',headers:httpHeaders})
    .pipe(
      tap(
        res => {
          if (res.body){            
            this.userSubject$.next(res.body);
          }
        },
        error => {
          this.logout();
        }
      )
    );
  }
  getUserName(): string{
    return this.userName;
  }
  isVerified(): boolean{
    return this.userIsVerified;
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
  private decodeAndNotify(): void{
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;

    this.userName = user.users_name;
    this.userIsVerified = user.is_verified;

    this.userSubject$.next(user);

  }
}
