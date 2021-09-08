import {Component, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';


import {PhotoService} from '../photo/photo.service';
import {Photo} from '../photo/photo';
import {AlertService} from '../../shared/alert/alert.service';
import {Comments} from '../comments/comments';

@Component({
  selector:  'app-photo-detail',
  templateUrl:  'photo-detail.component.html',
  styleUrls:  ['./photo-detail.scss']
})
export class PhotoDetailComponent implements OnInit{

  photo$: Observable<Photo>;
  photoId: number;
  photoComment: boolean = false;
  comments: Comments[] = [];

  constructor(
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService) {}

    ngOnInit(): void {
    this.photoId  = this.activatedRoute.snapshot.params.photoId;
    this.photo$    = this.photoService.findById(this.photoId);

    this.photo$.subscribe(() => {}, (err) => {
      this.alertService.danger("Error, try later");
    });
  }
  isPhoto(value): boolean{
    if (value != null){
      return(value.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    return false;
  }
  removePhoto(): any{
    this.alertService.success('Image deleted!');
    history.back();
    return;
    return this.photoService.removePhoto(this.photoId)
      .subscribe(() => {

        this.router.navigate([''], {replaceUrl: true});
      },
        error => {
        this.alertService.warning('An error occurred, please try later!');
          }
        );
  }
}
