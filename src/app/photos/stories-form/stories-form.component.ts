import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-stories-form',
  templateUrl: './stories-form.component.html',
  styleUrls: ['./stories-form.component.scss']
})
export class StoriesFormComponent implements OnInit {

  constructor(
    private alertService: AlertService
  ) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (mediaStream) {
        var video = document.querySelector('#video-stories');
        (<any>video).srcObject = mediaStream;
        (<any>video).play();
      })
      .catch((err)=>{
        this.alertService.danger('The aplication require your permition to use camera')
      })
  }

  ngOnInit(): void { }

}
