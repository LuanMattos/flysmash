import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src'
  }
})
export class ImgOnerrorDirective {

  @Input() src: string;
  @Input() default: string;


  updateUrl(): void {
    this.src = this.default;
  }
}
