import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-stories-form',
  templateUrl: './stories-form.component.html',
  styleUrls: ['./stories-form.component.scss']
})
export class StoriesFormComponent implements OnInit {
  videoSourcesSelect;
  MediaStreamHelper;
  videoPlayer;
  constraints;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    (() => {
      const videoElm = (<any>document).querySelector('#video');
      const btnFront = (<any>document).querySelector('#btn-front');
      const btnBack = (<any>document).querySelector('#btn-back');
    
      const supports = navigator.mediaDevices.getSupportedConstraints();
      if (!supports['facingMode']) {
        alert('Browser Not supported!');
        return;
      }
    
      let stream;
    
      const capture = async facingMode => {
        const options = {
          audio: false,
          video: {
            facingMode,
          },
        };
    
        try {
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
          }
          stream = await navigator.mediaDevices.getUserMedia(options);
        } catch (e) {
          alert(e);
          return;
        }
        videoElm.srcObject = null;
        videoElm.srcObject = stream;
        videoElm.play();
      }
      
      localStorage.setItem('camSelected','1');
      capture('environment');
    
      btnBack.addEventListener('click', () => {
        localStorage.setItem('camSelected','1');
        capture('environment');
      });
    
      btnFront.addEventListener('click', () => {
        localStorage.setItem('camSelected','2');
        capture('user');
      });
    })();
    // this.videoSourcesSelect.onchange = function () {
    //   this.MediaStreamHelper.requestStream().then(function (stream) {
    //     this.MediaStreamHelper._stream = stream;
    //     this.videoPlayer.srcObject = stream;
    //   });
    // };

    // audioSourcesSelect.onchange = function () {
    //   this.MediaStreamHelper.requestStream().then(function (stream) {
    //     this.MediaStreamHelper._stream = stream;
    //     this.videoPlayer.srcObject = stream;
    //   });
    // };
  }
  changeCamera():void{
    const btnFront = (<any>document).querySelector('#btn-front');
    const btnBack = (<any>document).querySelector('#btn-back');
    const camera = localStorage.getItem('camSelected');
    if(camera == '1'){
      btnFront.click();
    }else if(camera == '2'){
      btnBack.click();
    }


      // this.MediaStreamHelper.requestStream().then((stream)=> {
      //   this.MediaStreamHelper._stream = stream;
      //   this.videoPlayer.srcObject = stream;
      // });
      // localStorage.setItem('camera','1');
      // const currentSelected = parseInt(localStorage.getItem('camera'));
      // const lengthCamera = this.videoSourcesSelect.options.length;

      // this.videoSourcesSelect.options[1]
      // Array.prototype.forEach.call(this.videoSourcesSelect.options, (el,i)=>{
      //   if(!el.selected){
      //       // el.selected = true
      //       // this.videoSourcesSelect.options[i].selected = true
      //   }else{
      //     // el.selected = false
      //   }

      // })
  }
}
