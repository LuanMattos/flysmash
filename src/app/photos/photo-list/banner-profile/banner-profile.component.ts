import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/core/user/user';
import { SecurityCommonsService } from 'src/app/shared/services/security-commons.service';
import { UserService } from 'src/app/core/user/user.service';
import { FollowService } from 'src/app/core/follow/follow.service';


@Component({
  selector: 'app-banner-profile',
  templateUrl: './banner-profile.component.html',
  styleUrls: ['./banner-profile.component.scss']
})
export class BannerProfileComponent implements OnInit {
  user: User;
  $user;
  userIsMy;
  iamFollowingUser;
  spinner;
  $followings;
  $followers;

  constructor(
    private securityCommons: SecurityCommonsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private followService: FollowService
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    this.$user = this.userService.getUser();

    if( this.userService.isLogged() ){
      this.$followings = this.followService.usersFollowings;
      this.$followers = this.followService.usersFollowers;
    }
    this.activatedRoute.url.subscribe(url => {
      this.user = this.activatedRoute.snapshot.data.user;
    })

    //   this.users_cover_url = this.securityCommons.passSecurityUrl(this.user.users_cover_url);
    //   this.user.users_avatar = this.securityCommons.passSecurityUrl(this.user.users_avatar, environment.ApiUrl + 'storage/profile_default/default.png');
  }
  redirectPhotoProfile(): void {
    if (this.userService.isLogged()) {
      this.router.navigate(['/edit-photo-profile']);
    }
  }
  isMy(): boolean {
    const userName = this.user?.users_name;
    this.$user.subscribe(user => this.userIsMy = user.users_name);
    return (userName === this.userIsMy);
  }
  follow(): void {
    this.spinner = true;
    this.followService.follow(this.user?.users_name)
      .subscribe(
        (res) => {
          this.spinner = false;
          this.updateFollowings(res);
        },
        (error) => {
          this.spinner = false;
        }
      );
  }
  updateFollowings(res): void {
    if (res.status == 201) {
      this.followService.addUserFollowingSubject(res.body);
    } else if (res.status == 200 && this.user?.users_name) {
      this.followService.removeUserFollowingSubject(this.user.users_name);
    }
  }
}