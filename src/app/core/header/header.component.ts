import {Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {WindowRefService} from '../nativejs/windowRef.service';
import {isPlatformBrowser} from '@angular/common';
import {HeaderService} from "./header.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user$: Observable<User>;
  user;
  openSearch: boolean;
  private prevScrollpos;
  showFiller;
  showFillerLogged;
  currentSession$: Observable<any>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private windowRef: WindowRefService,
    public headerService: HeaderService,
    public dialog: MatDialog
    ) {
    this.user$ = userService.getUserByToken();
    this.user$.subscribe(user => this.user = user);
  }
  ngOnInit(): void{
    this.scrollHideHeader();

    this.currentSession$ = this.headerService.getCurrentSession();
  }
  closeDialogFormSettings(): void {
    this.headerService.setCurrentSession('');
    this.dialog.closeAll();
    this.router.navigate(['/setting', this.user.user_name]);
  }
  closeDialogForm(): void {
    this.headerService.setCurrentSession('');
    this.router.navigate(['']);
  }
  closeDialog(): void {
    this.showFillerLogged = false;
    this.headerService.setCurrentSession('');
    this.dialog.closeAll();
  }

  scrollHideHeader(): void{
    // if (isPlatformBrowser(this.platformId)) {
    //   this.prevScrollpos = this.windowRef.nativeWindow.pageYOffset;
    //   this.windowRef.nativeWindow.onscroll = () => {
    //     const currentScrollPos = this.windowRef.nativeWindow.pageYOffset;
    //     if (this.prevScrollpos > currentScrollPos) {
    //       document.getElementById('navbar-scrool').style.top = '0';
    //     } else {
    //       document.getElementById('navbar-scrool').style.top = '-50px';
    //     }
    //     this.prevScrollpos = currentScrollPos;
    //   };
    // }
  }
  logout(): void{
    this.router.navigate(['']);
    this.userService.logout();
  }
  redirect(): void{
    this.router.navigate(['timeline', this.user.user_name]);
  }
  redirectToProfile(): void{
    this.router.navigate(['i', this.user.user_name]);
  }
  verifiedAccount(): boolean{
    if (this.userService.isLogged() && !this.user.verified){
     return false;
    }
    return true;
  }
  isLogged(): any{
    return this.userService.isLogged();
  }
  eventMenuDesktopLogged(): void{
    window.scrollBy(null, 0);
    this.showFillerLogged = !this.showFillerLogged;
  }
  eventMenuDesktop(): void{
    window.scrollBy(null, 2000000000000);
  }
  eventMenuMobile(): void{
    window.scrollBy(null, -1000);
    this.showFiller = !this.showFiller;
  }
  eventMenuMobileItemMenu(): void{
    window.scrollBy(null, 2000000000000);
    this.showFiller = !this.showFiller;
  }
}
