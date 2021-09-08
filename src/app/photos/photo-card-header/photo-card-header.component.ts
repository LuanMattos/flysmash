import {Component, OnInit, Input} from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/shared/alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector:  'app-photo-card-header',
  templateUrl: 'photo-card-header.component.html',
  styleUrls:  ['./photo-card-header.component.scss']
})
export class PhotoCardHeaderComponent implements OnInit{
    description: string;
    photos: Photo[] = [];
    @Input() photo: Photo;
    isDetail: boolean;
    innerWidth;
    
    constructor(
        private photoService: PhotoService,
        private alertService: AlertService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.isModuleDetail();
        this.widthScreen();
    }
    widthScreen(): void{
        this.innerWidth = window.innerWidth;
        window.addEventListener('resize',()=>{ this.innerWidth = window.innerWidth; });
    } 
    edit(photo): void{
       console.log('editar')
    }
    isModuleDetail(): void{
      this.isDetail = this.activatedRoute.snapshot.data.isDetail
    }
    //   save( photoDescription: string, photoId: number, i: number ): void{
    //     this.photoService
    //       .updatePhoto( photoDescription, photoId )
    //       .subscribe(
    //         success => {
    //         //   this.photos[i].photo_description = success.photoDescription;
    //         }
    //       );
    // }
    delete( photo ): void{
      this.photoService
        .removePhoto( photo.photo_id )
        .subscribe();
    } 
}
