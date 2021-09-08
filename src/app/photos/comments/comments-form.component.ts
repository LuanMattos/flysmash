import {Component, EventEmitter, Input, Output, AfterViewInit, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

import {PhotoService} from '../photo/photo.service';
import {Comments} from './comments';
import {PhotoCommentsService} from '../photo-detail/photo-comments/photo-comments.service';

@Component({
  selector:  'app-comments-form',
  templateUrl:  './comments-form.component.html',
  styleUrls:  ['./comments-form.component.css'],
})
export class CommentsFormComponent implements OnInit, OnChanges{

  @Input() viewComponent: boolean;
  @Input() photoId: number;
  @Input() comment_text: string;
  @Output() comments = new EventEmitter<Comments[]>();
  @Output() viewFormComment: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(
    private photoCommentsService: PhotoCommentsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      comment_text: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void{
    if (changes && changes.comment_text && changes.comment_text.currentValue){
      this.form.get('comment_text').setValue(this.comment_text);
    }
  }
  save(): void{
    const comment = this.form.get('comment_text').value as string;
    const commentId = this.photoCommentsService.comment?.comment_id;

    this.photoCommentsService
      .saveComment(this.photoId, comment, commentId)
      .pipe( switchMap(() => this.photoCommentsService.getComments(this.photoId)))
      .pipe( tap(() => {
        this.form.reset();
        this.viewFormComment.emit(!this.viewComponent);
      }))
      .subscribe(result => this.comments.emit(result));
    this.photoCommentsService.comment?.comment_id ? this.photoCommentsService.comment.comment_id = null : false;
  }

  emitEvent(): void{
      this.viewFormComment.emit(!this.viewComponent);
  }
}
