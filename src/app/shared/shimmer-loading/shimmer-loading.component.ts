import {Component, Input} from "@angular/core";

@Component({
  selector:'app-shimmer-loading',
  templateUrl:"./shimmer-loading.component.html"
})
export class ShimmerLoadingComponent{
  @Input() qtd:number = 0;
  constructor() {}
  counter() {
    const item = [];
    for (let i=0; i <= this.qtd; i++){
      item.push(i)
    }
    return item
  }
}
