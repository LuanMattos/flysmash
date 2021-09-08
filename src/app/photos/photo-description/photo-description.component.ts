import {Component, OnInit, Input} from '@angular/core';
import { Photo } from '../photo/photo';

@Component({
  selector:  'app-photo-description',
  templateUrl: 'photo-description.component.html',
  styleUrls:  ['./photo-description.component.scss']
})
export class PhotoDescriptionComponent implements OnInit{
    @Input() photo: Photo;
    
    constructor() {}
    ngOnInit(): void {
    }
}
