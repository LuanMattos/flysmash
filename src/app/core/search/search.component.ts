import {Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {WindowRefService} from '../nativejs/windowRef.service';
import {isPlatformBrowser} from '@angular/common';
import {debounceTime} from 'rxjs/operators';
import {PhotoService} from '../../photos/photo/photo.service';
import {environment} from "../../../environments/environment";
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  user: User;
  openSearch: boolean;
  hasMore = true;
  users: User[] = [];
  avatarDefault: string = environment.ApiUrl + 'storage/profile_default/default.png';
  debounce:Subject<string> = new Subject<string>();
  onTyping;
  filter:string = '';
  value:string = '';


  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private windowRef: WindowRefService,
    private photoService: PhotoService,
    private searchService:SearchService
    ) {
    
  }
  ngOnInit(): void{
    this.debounce
    .pipe( debounceTime( 500 ) )
    .subscribe(filter => 
      {
        this._filter( filter );
      }
    );
  }
  _filter( value ): any{

    if ( !value ){
      this.users = [];
      return false;
    }
    this.searchService.getUserByName( value )
      .pipe( debounceTime(300) )
      .subscribe(response => {
        this.users = response.body;
      }
    );
  }
  moreUsers(): void{
    this.searchService.getUserByNamePaginated( this.filter, this.users.length )
      .subscribe(users => {
        this.users = this.users.concat(users);
        if (!users.length){ this.hasMore = false; }
      });
  }
  clearInput(): void{
    this.users = [];
    (<any>document.getElementById('autocomplete-input')).value = '';
    this.debounce.next('');
  }
}
