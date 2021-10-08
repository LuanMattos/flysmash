import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Photo} from './photo';
import {environment} from '../../../environments/environment';
import {Comments} from '../comments/comments';
import {User} from '../../core/user/user';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';

const API = environment.ApiUrl;
const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 10000;



@Injectable({providedIn: 'root'})
export class PhotoService {
  public photoSubject = new BehaviorSubject<any>(null);
  public postSubject = new BehaviorSubject<any>(null);
  private cache$: Observable<any>;
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    ) {}

  /* Photo */
  registerViewPhoto(photoId, time): any{
    const formData = new FormData();
    formData.append('photoId', photoId.toString());
    formData.append('time', time.toString());
    return this.http.post(API + 'statics_photo', formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );
  }
  registerErrorPhoto(photoId: number): any{
    return this.http.get<Photo[]>(API + '/register_error_photo/' + photoId);
  }
  listFromUser(userName: string): Observable<Photo[]>{
    return this.http.get<Photo[]>(API + 'photos/' + userName);
  }
  listFromUserPaginated( userName: string, page: number ): Observable<Photo[]>{
        const params = new HttpParams()
                  .append('page', page.toString());
        return this.http.get<Photo[]>(API +   'photos/' + userName , { params });
  }
  listFromToExplorerPaginated( page: number, repeat ): Observable<Photo[]>{
        const params = new HttpParams()
                  .append('page', page.toString())
                  .append('repeat', repeat);
        return this.http.get<Photo[]>(API +   'photos_to_explorer', { params });
  }
  listFromTimelinePaginated( page: number ): Observable<Photo[]>{
        const params = new HttpParams()
                  .append('page', page.toString());
        return this.http.get<Photo[]>(API +   'photos_timeline', { params });
  }
  upload(description: string,  files): Observable<any>{
    const formData = new FormData();
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});
    formData.append('post_description', description);
    function base64ToFile(data, filename): any {

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
    for(let i=0;i < files.length; i++){
      formData.append("files["+i+"]", base64ToFile(files[i].file, files[i].filter+i.toString()) );
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
  uploadVideo(description: string,   file, style: string): Observable<any>{
    const formData = new FormData();

    formData.append('description', description);
    formData.append('videoFile', file);
    formData.append('style', style);

    return this.http.post(API + 'videos_upload', formData,
      {
        observe: 'events',
        reportProgress: true
      }
    );

  }
  findById(id: number): Observable<Photo>{
    return this.http.get<Photo>(API + 'get_photo_id/' + id);
  }
  removePhoto( photoId: number ): Observable<any>{
    return this.http.delete(API + 'photos/' + photoId);
  }
  updatePhoto( photoDescription, photoId ): Observable<any>{
    return this.http.put(API + 'update_photo/', { photoDescription, photoId });
  }

  /** Posts **/
  setPostsSubject( post ){
    this.postSubject.next( post );
  }
  getPosts(): Observable<any>{
    return this.postSubject.asObservable();
  }

  get posts(){
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(_ => this.requestPosts()),
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cache$;
  }
  private requestPosts() {
    const httpHeaders = new HttpHeaders({'Accept':'application/json','Authorization': this.tokenService.getToken()});

    return this.http.get<any>(API + 'posts', {headers:httpHeaders}).pipe(
      map(response => response)
    );
  }
  

  /** Likes **/
  like( photoId: number, userName: string ): any{
    return this.http.put<any>(API + 'add_like', { photoId, userName}, { responseType: 'json'});
  }

  /** Search **/
  getUserByName( name: string ): any{
    return this.http.put<User[]>(API + 'search', {name}, { responseType: 'json'});
  }
  getUserByNamePaginated( name: string, page: number ): any{
    return this.http.put<User[]>(API + 'search/' + page, {name}, { responseType: 'json'});
  }

  /** Follow **/
  follow( userId: number ): Observable<boolean>{
    return this.http.put<boolean>(API + 'follow/' + userId, {}, { responseType: 'json' });
  }

}

