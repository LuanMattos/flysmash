import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const API  = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class LogService{

  constructor(
    private http: HttpClient
  ) {}

  logHome(): void{
    this.http.get(API + 'log_home').subscribe();
  }

}
