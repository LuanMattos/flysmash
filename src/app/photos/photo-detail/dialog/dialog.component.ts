import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HeaderService} from '../../../core/header/header.service';


export interface Photo {
  photo_id: number;
  photo_url: string;
  photo_description: string;
  photo_allow_comments: string;
}

@Component({
  selector: 'app-dialog-component',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent{
  photoId: number;
  photoComment: boolean;
  comments;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Photo,
    public headerService: HeaderService
  ) {
    this.headerService.setCurrentSession('dialog-photo');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(photo): void {
  }

  edit(photo): void {
  }


}
