import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PostsService } from "../posts/posts.service";
import { TokenService } from "../token/token.service";

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class StoriesService {
    stories$ = new BehaviorSubject<Array<any>>(null);
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private postsService: PostsService
  ) {}

  upload(description: string,  file, filter): Observable<any>{
    const formData = new FormData();
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});
    formData.append('stories_description', description.length?description:'');
    formData.append("photos_stories_url", this.postsService.base64ToFile(file, filter.length?filter:Date.now()) );
    formData.append("photos_stories_filter", filter );

    return this.http.post(API + 'stories/save', formData,
      {
          observe: 'events',
          reportProgress: true,
          headers:httpHeaders
      }
    );

  }
  addStoriesSubject( newData ){
    this.stories$.next([newData,...this.stories$.value]);
  }
}