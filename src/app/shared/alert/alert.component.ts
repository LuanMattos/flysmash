import {Component, Input} from "@angular/core";

import {AlertService} from "./alert.service";
import {Alert, AlertType} from "./alert";

@Component({
  selector:'app-alert',
  templateUrl:'alert.component.html'
})
export class AlertComponent{
  @Input() timeout = 8000;
  alerts:Alert[] = [];

  constructor(
    private alertService:AlertService,) {
    this.alertService.getAlert()
      .subscribe(alert=>{
        if(!alert){
          this.alerts = [];
          return;
        }
        this.alerts.push(alert);
        setTimeout(()=>{this.removeAlert(alert)},this.timeout)
      })
  }
  removeAlert(alertRemove:Alert){
    this.alerts = this.alerts.filter(alert=>alertRemove != alert)
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
