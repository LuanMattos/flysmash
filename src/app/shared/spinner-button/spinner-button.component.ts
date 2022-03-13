import {Component, EventEmitter, Input, Output, SimpleChanges} from "@angular/core";

@Component({
  selector:'app-spinner-button',
  templateUrl:'./spinner-button.component.html',
  styleUrls:['spinner-button.component.scss']
})
export class SpinnerButtonComponent{
  @Input() viewSpinner:boolean;
  @Output() viewSpinnerOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  ngOnChanges(changes: SimpleChanges): void{
    if (changes && changes.viewSpinner){
      // console.log(changes.viewSpinner)
    }
  }
}
