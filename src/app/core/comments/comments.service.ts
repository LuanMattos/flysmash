import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import { TokenService } from '../token/token.service';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class CommentsService {

  index:number;
  
  constructor(
    private http: HttpClient,
    private tokenService:TokenService
    ) {}

    // /** Likes **/
    // like( posts_id ): any{
    //   const httpHeaders = new HttpHeaders({
    //     'Authorization': this.tokenService.getToken()
    //   });
    //   return this.http.put<any>(API + 'posts/likes/like', { posts_id }, { headers:httpHeaders, responseType: 'json'});
    // }
 
}

