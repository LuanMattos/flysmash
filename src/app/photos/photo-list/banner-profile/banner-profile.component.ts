import {Component, OnInit} from '@angular/core';
import { User } from 'src/app/core/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import { SecurityCommonsService } from 'src/app/shared/services/security-commons.service';
import { PhotoService } from '../../photo/photo.service';
import { UserService } from 'src/app/core/user/user.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-banner-profile',
  templateUrl: './banner-profile.component.html',
  styleUrls: ['./banner-profile.component.scss']
})
export class BannerProfileComponent implements OnInit {
  user: User;
  $user;
  
  constructor(
    private securityCommons: SecurityCommonsService,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void{
    this.user = this.activatedRoute.snapshot.data.user;
    this.$user = this.userService.getUser();
   
    this.activatedRoute.url.subscribe(url =>{
      this.user = this.activatedRoute.snapshot.data.user;
    })
    
    //   this.users_cover_url = this.securityCommons.passSecurityUrl(this.user.users_cover_url);
    //   this.user.users_avatar = this.securityCommons.passSecurityUrl(this.user.users_avatar, environment.ApiUrl + 'storage/profile_default/default.png');
  }
  redirectPhotoProfile(): void{
    if(this.userService.isLogged()){
      this.router.navigate(['/edit-photo-profile']);
    }
  }
}