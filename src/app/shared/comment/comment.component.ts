import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { CommentsService } from 'src/app/core/comments/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  commentForm: FormGroup;
  @Input() comments;
  @Input() post;
  @Input() index:number;
  @Output() emitIndex: EventEmitter<number> = new EventEmitter<number>();
  currentIndex:number;

  constructor(
    private router: Router,
    private commentsService:CommentsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      commentText: ['', Validators.required],
  });
  }

  commentScale(index):void{
    this.currentIndex = index;
    this.emitIndex.emit(index);
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
    console.log(document.getElementsByClassName('icon-feather-send')[1].classList)
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
    if( this.commentForm.valid && !this.commentForm.pending ){
      this.commentsService.comment(this.post.posts_id, this.commentForm.get('commentText').value)
      .subscribe(
        response => {
          console.log(response )
          const commentText = response;  
          this.close();
        },
        error => {
          this.close();
        }
      );
    }
  }
  close():void{
    this.commentForm.get('commentText').setValue('')
    this.closeCommentScale();
    this.hideSpinnerSend();
  }
}
