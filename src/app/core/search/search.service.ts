import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';
import {User} from '../../core/user/user';
import { TokenService } from '../token/token.service';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class SearchService {
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    ) {}

  /** Search **/
  getUserByName( search: string ): any{
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.http.put<User[]>(API + 'users/search', { search }, { observe: 'response', headers: httpHeaders });
  }
  getUserByNamePaginated( search: string, offset: number ): any{
    const httpHeaders = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.http.put<User[]>(API + 'users/search', { search, offset }, { responseType: 'json', headers: httpHeaders});
  }

}

