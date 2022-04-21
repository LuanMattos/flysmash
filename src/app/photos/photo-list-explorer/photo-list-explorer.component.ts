import {AfterViewInit, Component,  OnInit} from '@angular/core';

import { ScrollService } from 'src/app/shared/scroll/scroll.service';
import { PostsService } from 'src/app/core/posts/posts.service';
import { NavigationEnd, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-photo-list-explorer',
  templateUrl: './photo-list-explorer.component.html',
  styleUrls: ['./photo-list-explorer.component.scss']
})
export class PhotoListExplorerComponent implements OnInit, AfterViewInit {

  title = 'App';
  posts$;
  postModal: Array<any> = [];
  spinner: boolean;

  constructor(
    private scrollService:ScrollService,
    private postsService: PostsService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void{
    this.scrollService.scrollUpdate();
    this.posts$ = this.postsService.postsExplorer;

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.posts$ = this.postsService.postsExplorer;
       }
      }
    )
  }
  ngAfterViewInit(): void{

  }
  loadMore(): void{
    this.spinner = true;
    this.postsService.requestMorePostsExplorer().subscribe(
      (success)=>{
        this.spinner = false;
      },
      (error)=>{
        this.spinner = false;
        this.alertService.danger("Error! I'm sorry, try later!");
      }
    );
  }

}

