import {Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {WindowRefService} from '../nativejs/windowRef.service';
import {isPlatformBrowser} from '@angular/common';
import {debounceTime} from 'rxjs/operators';
import {PhotoService} from '../../photos/photo/photo.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-search-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  user: User;
  openSearch: boolean;
  filter = '';
  hasMore = true;
  users: User[] = [];
  avatarDefault: string = environment.ApiUrl + 'storage/profile_default/default.png';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private windowRef: WindowRefService,
    private photoService: PhotoService
    ) {
    
  }
  ngOnInit(): void{
    this.userService.getUser().subscribe((data)=>{this.user = data;});
    console.log(this.user);
  }
  moreUsers(): void{
    this.photoService.getUserByNamePaginated( this.filter, this.users.length )
      .subscribe(users => {
        this.users = this.users.concat(users);
        if (!users.length){ this.hasMore = false; }
      });
  }
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
}
