import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
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
    edit(comments_id, comments_text, posts_id): any{
      const httpHeaders = new HttpHeaders({
        'Authorization': this.tokenService.getToken()
      });
      return this.http.put<any>(API + 'posts/comments/update', { comments_id, comments_text, posts_id }, { headers:httpHeaders, responseType: 'json'});
    }
    delete( comments_id:number, posts_id:number ): Observable<any>{
      const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});
      return this.http.delete(API + 'posts/comments',{headers:httpHeaders, params:{'comments_id':comments_id.toString(),'posts_id':posts_id.toString()} });
    }
 
}

