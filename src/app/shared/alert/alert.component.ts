import {Component, Input} from "@angular/core";

import {AlertService} from "./alert.service";
import {Alert, AlertType} from "./alert";

@Component({
  selector:'app-alert',
  templateUrl:'./alert.component.html',
  styleUrls:['./alert.component.scss'],
})
export class AlertComponent{
  @Input() timeout = 3000;
  alerts:Alert[] = [];
  alert:Alert;

  constructor(
    private alertService:AlertService,) {

  }
  ngOnInit() {
    this.alertService.getAlert()
      .subscribe(alert=>{
        if(!alert){
          this.alerts = [];
          return;
        }
        if(!this.alerts.length){
          this.alerts.push(alert);
        }else{
          setTimeout(()=>{this.alerts.push(alert);},this.timeout)          
        }
        this.alert = alert;
        setTimeout(()=>{this.removeAlert()},this.timeout)
      })
  }
  removeAlert(){
    this.alerts = [];
  }
  getAlertClass(alert : Alert){
    if(!alert){return ''}
    switch(alert.alertType){
      case AlertType.DANGER:
        return 'alert-danger';
      case AlertType.INFO:
        return 'alert-info';
      case AlertType.SUCCESS:
        return 'alert-success';
      case AlertType.WARNING:
        return 'alert-warning';
    }
  }
}
