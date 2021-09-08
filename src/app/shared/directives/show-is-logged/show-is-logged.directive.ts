import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

import {UserService} from '../../../core/user/user.service';

@Directive({
  selector: '[showIsLogged]'
})
export class ShowIsLoggedDirective implements OnInit{

  constructor(
      private userService: UserService,
      private el: ElementRef,
      private render: Renderer2
  ) {}

  ngOnInit(): void{
    !this.userService.isLogged() &&
    this.render.setStyle(this.el.nativeElement, 'display', 'none');
  }

}
