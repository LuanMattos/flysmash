import {Directive, HostListener} from "@angular/core";
@Directive({
  selector:'[appBackHistory]'
})
export class BackHistoryDirective{

  constructor() {}

  @HostListener('click', ['$event']) onClick($event){
    window.history.back();
  }
}
