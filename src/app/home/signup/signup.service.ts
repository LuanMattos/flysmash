import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {NewUser} from './new-user.interface';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

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
  newUser( newUser: NewUser ): any{
    return this.httpClient.post(API + 'signup', newUser);
  }
}
