import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class LikesService {
  
  constructor(
    private http: HttpClient,
    ) {}

    /** Likes **/
    like( photoId: number, userName: string ): any{
      return this.http.put<any>(API + 'add_like', { photoId, userName}, { responseType: 'json'});
    }
 
}

