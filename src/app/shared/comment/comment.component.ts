import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { CommentsService } from 'src/app/core/comments/comments.service';
import { PostsService } from 'src/app/core/posts/posts.service';
import Swal from 'sweetalert2';
import { AlertService } from '../alert/alert.service';

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
  currentIndexComment:number;
  type:string='';

  constructor(
    private commentsService:CommentsService,
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private postsService: PostsService,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {
      this.commentForm = this.formBuilder.group({
        commentText: ['', Validators.required],
    });
    if(document.getElementById('overlay')){
      document.getElementById('overlay').addEventListener('click',()=>{
        this.commentForm.controls['commentText'].setValue( '' )
      })
    }
    
  }

  currentIndexCommentSet( index ){
    this.currentIndexComment = index;
  }
  set outputDropdownComment( type ){
      this.type = type;
      switch( type ){
        case 'edit':
          this.edit();
        break;
        case 'delete':
          this.delete();
        break;
        default:
          this.type='';
      }
  }
  edit():void {
    this.commentScale( this.index );
    (<HTMLElement>document.querySelector('body')).click();
    const comment = this.comments[this.currentIndexComment];
    this.commentForm.controls['commentText'].setValue( comment.comments_text )    
  } 
  commentScale(index):void{
    this.currentIndex = index;
    this.emitIndex.emit(index);
    const targetElementClassList = document.getElementsByClassName('hideShowScale')[this.index];
    if( (<any>targetElementClassList) ){
      const classList = targetElementClassList.classList
      classList.add('scale-input-comment')
      document.getElementById('close-overlay').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
    }    
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
  saveComment():void{
    switch( this.type ){
      case '':
        this.insert();
      break;
      case 'edit':
        this.update();
      break;
      case 'delete':
        this.delete();
      break;
    }
  }
  insert():void{    
    if( this.commentForm.valid && !this.commentForm.pending ){
      this.showSpinnerSend();
      this.commentsService.comment(this.post.posts_id, this.commentForm.get('commentText').value)
      .subscribe(
        response => {
          this.emitNewCommentPost(response);
          this.close();
        },
        error => {
          this.close();
        }
      );
    }
  }
  update():void{
    const newValue = this.commentForm.controls['commentText'].value;
    const comment = this.comments[this.currentIndexComment];    
    this.showSpinnerSend();
    if( this.commentForm.valid && !this.commentForm.pending ){
      this.commentsService
      .edit( comment.comments_id, newValue,this.post.posts_id )
      .subscribe(
        (response) => {
          this.postsService.editCommentPostSubject( comment.comments_id, newValue, this.index );
          this.close();
          this.alertService.success('Comment was edited');
        },
        err => {
          this.close();
          this.alertService.warning('Error try again later');
        }
      );
    }
  }
  delete():void {
    const comment = this.comments[this.currentIndexComment];    
    Swal.fire({
      title: 'Really delete this comment? If you delete, it cannot be undone',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {     
      if (result.isConfirmed) {
        this.alertService.info('Deleting your comment...',true);
        this.commentsService
        .delete( comment.comments_id, this.post.posts_id )
        .subscribe(
          (response) => {
            this.close();
            this.postsService.removeCommentPostSubject(comment.comments_id, this.index);
            this.alertService.success('Comment was deleted');
          },
          err => {
           this.close();
           this.alertService.warning('Error try again later');
          }
        );
      }else{
        this.close();
      }
    });
  }
  emitNewCommentPost(response){
    const comment = response;
    const posts = this.postService.posts.value;
    const index =  posts.findIndex(x => x.posts_id ===  this.post.posts_id);
    const currentPost = posts[index];
    const commentPush = {
      'comments_id':comment.comments_id,
      'comments_text':comment.comments_text,
      'users_id':comment.users_id,
      'posts_id':comment.posts_id,
      'users':{
        'users_avatar':comment.users.users_avatar,
        'users_name':comment.users.users_name,
      }
    };
    currentPost.firstThreeComment.unshift(commentPush)
  }
  close():void{
    this.commentForm.get('commentText').setValue('')
    this.closeCommentScale();
    this.hideSpinnerSend();
    this.type = '';
  }  
}
