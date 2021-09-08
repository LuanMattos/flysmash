import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
@Directive({
  selector: '[appClickCardSelected]'
})
export class ClickCardSelectedDirective {

  @Input() className = '';

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) {
  }
  @HostListener('click', ['$event'])
  onClick($event): void{
    // const size = document.querySelectorAll(this.className.toString()).length;
    // // const items = document.querySelectorAll(this.className.toString());
    // const items = this.el.nativeElement.querySelectorAll(this.className.toString());
    //   for (var i = 0; i <= size; i++) {
    //     // items[i].style.border = 'none';
    //     document.querySelectorAll(this.className.toString())[i].style.border = 'none';
    // }
    // this.render.setStyle(this.el.nativeElement, 'border', '3px solid #2778c4');
  }
}
