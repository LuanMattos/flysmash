import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comments } from '../../comments/comments';
const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoCommentsService {
  comment: Comments
  constructor(private http: HttpClient) {}
  /* Comments */
  getComments(photoId: number): any {
    return this.http.get<Comments[]>(API + '/comments_photo/' + photoId);
  }
  listFromCommentsPaginated(photoId: number, page: number ): any{
    return this.http.get<Comments[]>(API + '/comments_photo/' + photoId + '/' + page);
  }

  addComment(photoId: number, commentText: string, userName: string): any{
    return this.http.post(
      API + 'comments/' + photoId,
      {commentText, userName}
    );
  }
  saveComment(photoId: number, commentText, commentId: number): any{
    return this.http.put<Comments>(
      API + 'save_comment/' + photoId,
      {commentText, commentId}
    );
  }
  deleteComment(commentId: number): any{
    return this.http.delete(API + 'delete_comment/' + commentId);
  }
}
