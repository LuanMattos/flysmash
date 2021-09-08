import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FollowingService} from '../../../core/following/following.service';

@Component({
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit{
  user;
  followings;
  stoppedRequest: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private followingService: FollowingService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    this.followings = this.activatedRoute.snapshot.data.following;
  }
  loadFollowing(): void{
    if (!this.stoppedRequest) {
      this.followingService
        .getFollowingsByUser(this.user.userName, this.followings.length)
        .subscribe(res => {
          this.stoppedRequest = false;
          if (res && !res.length) {
            this.stoppedRequest = true;
          }
          res.reduce((acc, current) => {
            const x = this.followings.find(item => item.user_name === current.user_name);
            if (!x) {
              return this.followings = this.followings.concat(res);
            } else {
              return acc;
            }
          }, []);
        });
    }
  }
  redirectUser( following ): void{
    this.router.navigate(['i/' + following?.user_name]);
  }
}
