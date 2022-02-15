import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const API = environment.ApiUrl;
const APIV2 = environment.ApiUrlV2;

@Injectable({ providedIn: 'root' })

export class UserService {

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

  setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }
  getUserByToken(): Observable<any> {
    return this.userSubject$.asObservable();
  }
  getUser(): Observable<User> {
    return this.userSubject$.asObservable();
  }
  updateAvatarUserSubject(newUrl, authToken): void {
    const currentValue = this.userSubject$.value;

    const currentToken = this.tokenService.getToken()
    const newUserTokenDecoded = jwt_decode(currentToken) as User;
    newUserTokenDecoded.users_avatar = newUrl;

    this.tokenService.setToken(authToken);

    this.userSubject$.next(newUserTokenDecoded);
  }
  logout(): void {
    this.tokenService.removeToken();
    this.userSubject$.next(null);
    this.router.navigate(['/']);
  }
  isLogged(): boolean {
    //Erro Verificar a autenticidade do this.tokenService, não basta ver se ter token
    return this.tokenService.hasToken();
  }
  getDataUser(userName): Observable<any> {
    if (userName) {
      return this.getDataUserByUserName(userName);
    } else {
      return this.getDataUserById();
    }
  }
  getDataUserByUserName(userName): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    const formData = new FormData();
    formData.append('userName', userName);
    return this.http.post<any>(API + 'users/user_name',formData, { headers: httpHeaders }).pipe(
      tap(
        success => { },
        error => {
          this.logout();
        }
      )
    );
  }
  getDataUserById(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.http.get<any>(API + 'users', { headers: httpHeaders }).pipe(
      tap(
        success => { },
        error => {
          this.logout();
        }
      )
    );
  }

  getDataUserNoAuth(usersName: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer validToke.'
    });
    return this.http.get<any>(APIV2 + 'users/' + usersName, { observe: 'response', headers: httpHeaders })
      .pipe(
        tap(
          res => {
            if (res.body) {
              this.userSubject$.next(res.body);
            }
          },
          error => {
            this.logout();
          }
        )
      );
  }
  getUserName(): string {
    return this.userName;
  }
  isVerified(): boolean {
    return this.userIsVerified;
  }
  saveSettings(data): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    const formData = new FormData();
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    formData.append('user_email', data.userEmail);
    formData.append('description', data.description);
    formData.append('users_password', data.password);
    formData.append('confirm_password', data.confirmPassword);

    return this.http.post(API + 'account/save_setting', formData, { headers: httpHeaders });
  }
  uploadImgProfile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.http.post(API + 'upload_img_profile', formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );
  }
  uploadImgCover(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.http.post(API + 'upload_img_cover', formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );
  }
  getFollowersByUser(): Observable<any> {
    return this.http.post(API + 'get_followers', {});
  }
  private decodeAndNotify(): void {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;

    this.userName = user.users_name;
    this.userIsVerified = user.is_verified;

    this.userSubject$.next(user);

  }
}
