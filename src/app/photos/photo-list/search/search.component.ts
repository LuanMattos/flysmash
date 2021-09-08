import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {PhotoService} from '../../photo/photo.service';
import {debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../../core/user/user';
import {environment} from '../../../../environments/environment';
import {SecurityCommonsService} from '../../../shared/services/security-commons.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent{
  filter = '';
  users: User[] = [];
  hasMore = true;
  _openInputSearch = false;
  @ViewChild('search') searchInput: ElementRef<HTMLInputElement>;
  avatarDefault: string = environment.ApiUrl + 'storage/profile_default/default.png';
  @Output() openInputSearch: EventEmitter<boolean> =  new EventEmitter<boolean>();

  constructor(
    private securityCommons: SecurityCommonsService,
    private route: Router,
    private photoService: PhotoService ) {}


  _filter( value: string ): any{
    this.filter = value;
    this.hasMore = true;

    if ( !value ){
      this.users = [];
      return false;
    }
    this.photoService.getUserByName( this.filter )
      .pipe(debounceTime(300))
      .subscribe(response => {
        this.users = response;
      });
  }
  moreUsers(): void{
    this.photoService.getUserByNamePaginated( this.filter, this.users.length )
      .subscribe(users => {
        this.users = this.users.concat(users);
        if (!users.length){ this.hasMore = false; }
      });
  }
  toggleSearch(value): void{
    this.searchInput.nativeElement.value = '';
    this._openInputSearch = value;
    this.filter = '';
    this.openInputSearch.emit(this._openInputSearch);
  }
}
