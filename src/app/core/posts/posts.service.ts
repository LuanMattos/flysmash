import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import { BehaviorSubject, Observable} from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import {  map, publishReplay, refCount, tap } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class PostsService {
  private count: number;
  posts$ = new BehaviorSubject<Array<any>>(null);
  postsUser$ = new BehaviorSubject<Array<any>>(null);
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}
 
  get paginate(){
    this.requestPosts().subscribe((newData) => { this.posts$.next([...this.posts$.value, ...newData]); });
    return this.posts$;
  }
  get posts(){
    if (!this.posts$.value) {
      this.requestPosts().subscribe((data) => { this.posts$.next(data); });
    }
    return this.posts$;
  }
  get postsUser(){
    if (!this.posts$.value) {
      this.requestPostsUser().subscribe((data) => { this.postsUser$.next(data); });
    }
    return this.postsUser$;
  }
  addPostsSubject( newData ){
    this.posts$.next([newData,...this.posts$.value]);
  }
  removePostsSubject(posts_id:number){
    const postsArr: any[] = this.posts$.getValue();
    postsArr.forEach((item, index) => {
      if (item.posts_id == posts_id) { postsArr.splice(index,1) }
    });
    this.posts$.next(postsArr);
  }
  editCommentPostSubject( comments_id:number, comments_text:string, posts_index:number ){
    const postsArr: any[] = this.posts$.getValue();
    
    postsArr[posts_index].firstThreeComment.forEach((item, index) => {
      if (item.comments_id == comments_id) { item.comments_text = comments_text }
    });
    this.posts$.next(postsArr);
  }
  private requestPosts() {
    const formData = new FormData();

    formData.append('offset',this.count?this.count.toString():'0');
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});

    return this.http.post<any>(API + 'posts',formData, {headers:httpHeaders}).pipe(
      tap((response)=>{
        this.count = (this.count?this.count + response.length:response.length);
        }
      ),
      map(response => response),
      publishReplay(1),
      refCount()
    );
  }
  private requestPostsUser() {
    const formData = new FormData();

    formData.append('offset',this.count?this.count.toString():'0');
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});

    return this.http.post<any>(API + 'posts/user',formData, {headers:httpHeaders}).pipe(
      tap((response)=>{
        this.count = (this.count?this.count + response.length:response.length);
        }
      ),
      map(response => response),
      publishReplay(1),
      refCount()
    );
  }
  upload(description: string,  files): Observable<any>{
    const formData = new FormData();
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});
    formData.append('post_description', description);

    for(let i=0;i < files.length; i++){
      formData.append("files["+i+"]", this.base64ToFile(files[i].file, files[i].filter+i.toString()) );
      formData.append("filters["+i+"]", files[i].filter );
    }
    
    formData.append('post_allow_comments', 'true');

    return this.http.post(API + 'posts/save', formData,
      {
          observe: 'events',
          reportProgress: true,
          headers:httpHeaders
      }
    );

  }
  updateAvatar(files): Observable<any>{
    const formData = new FormData();
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});

    for(let i=0;i < files.length; i++){
      formData.append("files["+i+"]", this.base64ToFile(files[i].file, files[i].filter+i.toString()) );
      formData.append("filters["+i+"]", files[i].filter );
    }
    return this.http.post(API + 'account/photo_profile', formData,
      {
          observe: 'events',
          reportProgress: true,
          headers:httpHeaders
      }
    );

  }
  base64ToFile(data, filename): any {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  delete( posts_id:Number ): Observable<any>{
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});
    return this.http.delete(API + 'posts',{headers:httpHeaders, params:{"posts_id":posts_id.toString()} });
  }
}

