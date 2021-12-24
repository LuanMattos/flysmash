import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {NewUser} from './new-user.interface';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import { User } from 'src/app/core/user/user';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';

const API = environment.ApiUrl;
const APIV2 = environment.ApiUrlV2;

@Injectable({providedIn: 'root'})
export class SignupService{

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) {}

  checkUserEmailTaken(userEmail: string): any{
   return this.httpClient.get(APIV2 + 'users/');
  }
  newUser( newUser ): any{
    const data = {
      users_password:newUser.password,
      users_email:newUser.email,
      users_first_name:newUser.firstName,
      users_last_name:newUser.lastName,
      confirm_password:newUser.confirmPassword
    };
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer validToke.' });
    const body=JSON.stringify(data);
    return this.httpClient.post(API + 'register', body,{observe: 'response',headers:httpHeaders})
    .pipe(
      tap(
        res => {
          const authToken = res.headers.get('x-access-token');
          if (authToken) {
            this.userService.setToken(authToken);
          }
        }
      )
    );
  }
}
