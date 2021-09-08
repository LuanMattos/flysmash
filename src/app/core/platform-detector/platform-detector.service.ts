/**
 * PLATFORM_ID = Token para injetar um serviço específico
 * **/
import {Injectable, PLATFORM_ID, Inject} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

@Injectable({providedIn:'root'})
export class PlatformDetectorService{

  constructor(@Inject(PLATFORM_ID) private platformId:string) {}

  /**
   * Retorna se o App está sendo executado em um Browser
   **/
  isPlatformBrowser(){
    return isPlatformBrowser(this.platformId)
  }

}
