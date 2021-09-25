import {Component, OnInit} from '@angular/core';
import { User } from 'src/app/core/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import { SecurityCommonsService } from 'src/app/shared/services/security-commons.service';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-banner-profile',
  templateUrl: './banner-profile.component.html',
  styleUrls: ['./banner-profile.component.scss']
})
export class BannerProfileComponent implements OnInit {
  user: User;
  isExplorer: boolean;
  isTimeline: boolean;
  following;
  users_cover_url;

  constructor(
    private securityCommons: SecurityCommonsService,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void{
    // this.isModuleExplorer();
    // if (!this.isExplorer && !this.isTimeline){
    //   this.user = this.activatedRoute.snapshot.data.user;
    //   this.following = this.activatedRoute.snapshot.data.user?.following;
    //   this.users_cover_url = this.securityCommons.passSecurityUrl(this.user.users_cover_url);
    //   this.user.users_avatar = this.securityCommons.passSecurityUrl(this.user.users_avatar, environment.ApiUrl + 'storage/profile_default/default.png');
    // }
  }
  // isModuleExplorer(): void{
  //   this.isExplorer = false;
  //   this.isTimeline = false;
  //   if (this.activatedRoute.snapshot.data.isToExplorer){
  //     this.isExplorer = true;
  //   }else if (this.activatedRoute.snapshot.data.isTimeline){
  //     this.isTimeline = true;
  //   }
  // }
  // follow(): void{
  //   this.photoService.follow( this.user.user_id ).subscribe(follow => {
  //     this.following = follow;
  //   });
  // }
  // openFollowers(): void{
  //   this.router.navigate(['followers/' + this.user.users_name]);
  // }
  // openFollowings(): void{
  //   this.router.navigate(['followings/' + this.user.users_name]);
  // }
}