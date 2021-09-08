import {Injectable} from '@angular/core';
import {SignupService} from './signup.service';
import {AbstractControl} from '@angular/forms';
import {debounceTime, switchMap, map, first} from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class UserNotTakenValidatorService{

  constructor(private signUpService: SignupService) {}
  checkUserNameTaken(): any{
      return (control: AbstractControl) => {
        return control
          .valueChanges
          .pipe(debounceTime(300))
          .pipe(switchMap(userName => this.signUpService.checkUserNameTaken(userName) ))
          .pipe(map(ExisteOsuario => ExisteOsuario ? {usuarioJaCadastrado: true} : null))
          .pipe(first());
      };
  }
  checkUserEmailTaken(): any{
      return (control: AbstractControl) => {
        return control
          .valueChanges
          .pipe(debounceTime(300))
          .pipe(switchMap(Emai => this.signUpService.checkUserEmailTaken(Emai) ))
          .pipe(map(ExisteOsuario => ExisteOsuario ? {usuarioJaCadastrado: true} : null))
          .pipe(first());
      };
  }

}
