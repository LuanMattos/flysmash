import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {NewUser} from './new-user.interface';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import { User } from 'src/app/core/user/user';

const API = environment.ApiUrl;

@Injectable()
export class SignupService{

  constructor(private httpClient: HttpClient) {}
  checkUserNameTaken(userName: string): any{
   return this.httpClient.get(API + 'valid_user/' + userName);
  }
  checkUserEmailTaken(userEmail: string): any{
   return this.httpClient.post(API + 'valid_email/', {userEmail});
  }
  newUser( newUser ): any{
    const data = {
      users_password:newUser.password,
      users_email:newUser.email,
      users_first_name:newUser.firstName,
      users_last_name:newUser.lastName,
      confirm_password:newUser.confirmPassword
    };
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer validToke.' 
    });
    const body=JSON.stringify(data);
    return this.httpClient.post(API + 'register', body,{observe: 'response',headers:httpHeaders});
  }
}
