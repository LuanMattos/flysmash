import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Photo} from './photo';
import {environment} from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class PhotoService {
  private count: number;
  posts$ = new BehaviorSubject<Array<any>>(null);
  
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
}

