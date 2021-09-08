import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Photo} from './photo';
import {environment} from '../../../environments/environment';
import {Comments} from '../comments/comments';
import {User} from '../../core/user/user';
import {BehaviorSubject, Observable} from 'rxjs';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class PhotoService {
  public photo = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}
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

  upload(description: string, allowComments: boolean, publico: boolean, file, style: string): Observable<any>{
    const formData = new FormData();

    formData.append('description', description);
    formData.append('public', publico ? 'true' : 'false');
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);
    formData.append('style', style);

    return this.http.post(API + 'photos_upload', formData,
      {
          observe: 'events',
          reportProgress: true
        }
      );

  }
  uploadVideo(description: string, allowComments: boolean, publico: boolean, file, style: string): Observable<any>{
    const formData = new FormData();

    formData.append('description', description);
    formData.append('public', publico ? 'true' : 'false');
    formData.append('allowComments', allowComments ? 'true' : 'false');
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

