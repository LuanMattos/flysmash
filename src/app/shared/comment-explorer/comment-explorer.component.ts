import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { CommentsService } from 'src/app/core/comments/comments.service';
import { PostsService } from 'src/app/core/posts/posts.service';
import Swal from 'sweetalert2';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-comment-explorer',
  templateUrl: './comment-explorer.component.html',
  styleUrls: ['./comment-explorer.component.scss']
})
export class CommentExplorerComponent implements OnInit{
  commentForm: FormGroup;
  @Input() comments;
  @Input() post;
  @Input() module: string;
  @Input() index:number;
  @Output() emitIndex: EventEmitter<number> = new EventEmitter<number>();
  currentIndex:number;
  currentIndexComment:number;
  currentIndexPostsId:number;
  type:string='';
  viewDropDown;
  posts_id;

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
  openDropDown(){
    
    this.viewDropDown = true;
  }

  currentIndexCommentSet( index ){
    this.currentIndexComment = index;
  }
  currentIndexPostsIdSet( index ){
    this.currentIndexPostsId = index;
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
    this.openInput(this.post.posts_id);
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
          this.closeInput();
        },
        error => {
          this.closeInput();
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
          this.postsService.editCommentPostExplorerSubject( comment.comments_id, newValue, this.index );
          this.closeInput();
          this.alertService.success('Comment was edited');
        },
        err => {
          this.closeInput();
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
            this.closeInput();
            this.postsService.removeCommentPostExplorerSubject(comment.comments_id, this.index);
            this.alertService.success('Comment was deleted');
          },
          err => {
           this.closeInput();
           this.alertService.warning('Error try again later');
          }
        );
      }else{
        this.closeInput();
      }
    });
  }
  emitNewCommentPost(response){
    const comment = response;
  
    if(this.module === 'explorer'){
      const postsExplorer = this.postService.postsExplorer.value;
      const indexExplorer =  postsExplorer.findIndex(x => x.posts_id ===  this.post.posts_id);
    
      const currentPostExplorer = postsExplorer[indexExplorer];
  
      const commentExplorerPush = {
        'comments_id':comment.comments_id,
        'comments_text':comment.comments_text,
        'users_id':comment.users_id,
        'posts_id':comment.posts_id,
        'users':{
          'users_avatar':comment.users.users_avatar,
          'users_name':comment.users.users_name,
        }
      };
    currentPostExplorer.firstThreeComment.unshift(commentExplorerPush)

    }else{
    
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
  }

  openOverlay(){
    const targetElementClassList = (<HTMLElement>document.getElementsByClassName('overlay-' + this.posts_id.toString())[0]);
    targetElementClassList.style.display = 'block';
  }
  closeOverlay(){
    const targetElementClassList = (<HTMLElement>document.getElementsByClassName('overlay-' + this.posts_id.toString())[0]);
    targetElementClassList.style.display = 'none';
  }
  openInput(posts_id){
    this.posts_id = posts_id;
    const targetElementInputClassList = (<HTMLElement>document.getElementsByClassName('input-number-' + this.posts_id.toString())[0]);
    targetElementInputClassList.classList.add('active-scale');
    this.openOverlay();
    this.type='';
  }
  closeInput(){
    const targetElementInputClassList = (<HTMLElement>document.getElementsByClassName('input-number-' + this.posts_id.toString())[0]);
    targetElementInputClassList.classList.remove('active-scale');
    this.commentForm.get('commentText').setValue('');
    this.closeOverlay();
    this.hideSpinnerSend();
  }
  set closeOverlayOutput(data){
    const targetElementInputClassList = (<HTMLElement>document.getElementsByClassName('input-number-' + this.posts_id.toString())[0]);
    if(targetElementInputClassList){
      targetElementInputClassList.classList.remove('active-scale');
    }
    this.closeInput();
  }  
}
