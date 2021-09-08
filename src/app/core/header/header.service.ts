import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeaderService{

  private headerSubject = new BehaviorSubject<any>('');

  setCurrentSession(data: string): any{
    this.headerSubject.next(data);
  }
  getCurrentSession(): any{
    return this.headerSubject.asObservable();
  }
}
