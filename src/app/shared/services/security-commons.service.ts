import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class SecurityCommonsService{

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  passSecurityUrl( instance, urlDefault= '' ): any{
    if ( instance ) {
      return this.sanitizer.bypassSecurityTrustUrl(instance);
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(urlDefault);
    }
  }
}
