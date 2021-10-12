import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Photo} from './photo';
import {environment} from '../../../environments/environment';
import {User} from '../../core/user/user';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import {  map, publishReplay, refCount, tap } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class PhotoService {
  private cache$: Observable<any>;
  private count: number;
  
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

  get posts(){
    if (!this.cache$) {
      this.cache$ = this.requestPosts()
    }
    return this.cache$;
  }
  paginate(){
   return this.requestPosts();
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

