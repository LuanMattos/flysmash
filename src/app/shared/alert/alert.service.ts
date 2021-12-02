import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Alert, AlertType} from './alert';

@Injectable({providedIn: 'root'})
export class AlertService {

  alertSubject: BehaviorSubject<Alert> = new BehaviorSubject<Alert>(null);

  success(message: string): void{
    this.alert(AlertType.SUCCESS, message);
  }
  warning(message: string): void{
    this.alert(AlertType.WARNING, message);
  }
  danger(message: string): void{
    this.alert(AlertType.DANGER, message);
  }
  info(message: string): void{
    this.alert(AlertType.INFO, message);
  }
  private alert(alertType: AlertType, message: string): void{
      this.alertSubject.next(new Alert(alertType, message));
  }
  getAlert(): Observable<any>{
    return this.alertSubject.asObservable();
  }
}
