import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {PhotoService} from '../photo/photo.service';
import {Photo} from '../photo/photo';

@Injectable({providedIn: 'root'})

export class PhotoListFeedResolver implements Resolve<Observable<Photo[]>>{

  constructor(private router: Router, private service: PhotoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]>{
      this.service.listFromTimelinePaginated(0).subscribe((response) => {
      }, error => {
        this.router.navigate(['not-found']);
      });
      return this.service.listFromTimelinePaginated( 0);
  }


}
