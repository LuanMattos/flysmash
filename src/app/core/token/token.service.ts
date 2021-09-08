import {Inject, Injectable} from '@angular/core';
// @ts-ignore
// import {LOCAL_STORAGE, WINDOW} from '@ng-toolkit/universal';


const KEY = 'authToken';

@Injectable({providedIn: 'root'})

export class TokenService{
  constructor(
    // @Inject(WINDOW) private window: Window,
    // @Inject(LOCAL_STORAGE) private localStorage: any
  ) {}


  hasToken(): boolean{
    if (typeof window !== 'undefined') {
      return !!this.getToken();
    }
    return false;
  }
  setToken(token): void{
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY, token);
    }
  }
  getToken(): any{
    if (typeof window !== 'undefined') {
      return localStorage.getItem(KEY);
    }
  }
  removeToken(): void{
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEY);
    }
  }
}
