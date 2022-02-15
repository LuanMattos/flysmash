import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() posts;
  currentIndexComment:number;
  post=[];
  
  constructor() { }

  ngOnInit(): void {
    
  }
  set closeOverlayOutput(data){
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.currentIndexComment];
    if(targetElementClassList){
      targetElementClassList.classList.remove('scale-input-comment');
    }
  } 
  set setIndex($event){
    this.currentIndexComment = $event;
  }
  open( post ){
    this.post = post
  }

}
