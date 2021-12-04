import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Alert, AlertType} from './alert';

@Injectable({providedIn: 'root'})
export class AlertService {

  alertSubject: BehaviorSubject<Alert> = new BehaviorSubject<Alert>(null);

  success(message: string, ping = false): void{
    this.alert(AlertType.SUCCESS, message, ping);
  }
  warning(message: string, ping = false): void{
    this.alert(AlertType.WARNING, message, ping);
  }
  danger(message: string, ping = false): void{
    this.alert(AlertType.DANGER, message, ping);
  }
  info(message: string, ping = false): void{
    this.alert(AlertType.INFO, message, ping);
  }
  private alert(alertType: AlertType, message: string, ping:boolean): void{
      const valueAlertSubject = this.alertSubject.value;
      if(!valueAlertSubject){
        this.alertSubject.next(new Alert(alertType, message, ping));
      }else{
        setTimeout(()=>{ this.alertSubject.next(new Alert(alertType, message, ping)); },3000)        
      }
  }
  getAlert(): Observable<any>{
    return this.alertSubject.asObservable();
  }
}
