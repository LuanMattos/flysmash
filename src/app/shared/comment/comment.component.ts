import {Component, Input, OnInit} from '@angular/core';


import { Router } from '@angular/router';
import { CommentsService } from 'src/app/core/comments/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{

  @Input() comments;
  @Input() allowComments;
  @Input() index:number;


  constructor(
    private router: Router,
    private commentsService:CommentsService
  ) {}

  ngOnInit(): void {
  }
  set closeOverlayOutput(data){
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.index].classList;
    targetElementClassList.remove('scale-input-comment')
  }

  commentScale():void{
    console.log(this.index)

    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.index].classList;
    targetElementClassList.add('scale-input-comment')
    document.getElementById('close-overlay').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }
  closeCommentScale():void{
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.index].classList;
    targetElementClassList.remove('scale-input-comment');
    document.getElementById('close-overlay').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }
  showSpinnerSend(){
    const iconSend = document.getElementsByClassName('icon-feather-send')[this.index].classList;
    const spanSpinner = document.getElementsByClassName('span-spinner')[this.index].classList;
    iconSend.add('d-none');
    spanSpinner.remove('d-none');
  }
  hideSpinnerSend(){
    const iconSend = document.getElementsByClassName('icon-feather-send')[this.index].classList;
    const spanSpinner = document.getElementsByClassName('span-spinner')[this.index].classList;
    iconSend.remove('d-none');
    spanSpinner.add('d-none');
  }
  sendComment():void{
    this.showSpinnerSend();
    setTimeout(()=>{
      this.closeCommentScale();
      this.hideSpinnerSend();
    },2000)
  }
}
