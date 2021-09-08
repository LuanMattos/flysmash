import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenService} from '../token/token.service';


@Injectable({providedIn: 'root'})
export class RequestInterceptor implements HttpInterceptor{

  constructor(
    private tokenService: TokenService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token){
      req = req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    return next.handle(req);
  }

}
