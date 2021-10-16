import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../../core/user/user';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class SearchService {
  
  constructor(
    private http: HttpClient,
    ) {}

  /** Search **/
  getUserByName( name: string ): any{
    return this.http.put<User[]>(API + 'search', {name}, { responseType: 'json'});
  }
  getUserByNamePaginated( name: string, page: number ): any{
    return this.http.put<User[]>(API + 'search/' + page, {name}, { responseType: 'json'});
  }

}

