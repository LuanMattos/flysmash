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

    comment( posts_id, comment_text ): any{
      const httpHeaders = new HttpHeaders({
        'Authorization': this.tokenService.getToken()
      });
      return this.http.put<any>(API + 'posts/comments/comment', { posts_id, comment_text }, { headers:httpHeaders, responseType: 'json'});
    }
 
}

