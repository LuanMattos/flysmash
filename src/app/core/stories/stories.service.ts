import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, publishReplay, refCount, tap } from "rxjs/operators";
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

  get stories(){
    if (!this.stories$.value) {
      this.requestStories().subscribe((data) => { this.stories$.next(data); });
    }
    return this.stories$;
  }
  private requestStories() {
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});

    return this.http.get<any>(API + 'stories', {headers:httpHeaders}).pipe(
    //   tap((response)=>{
    //     this.count = (this.count?this.count + response.length:response.length);
    //     }
    //   ),
      map(response => response),
      publishReplay(1),
      refCount()
    );
  }
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
    this.stories$.value.map((data, pos)=>{
      if(newData.stories_id === data.stories_id){
        this.stories$.value[pos].photos_stories = newData.photos_stories
        // this.stories$.next([newData.photos_stories,...this.stories$.value[pos].photos_stories]);
      }
      // else{
      //   this.stories$.next([newData,...this.stories$.value]);        
      // }
    });
  }
}