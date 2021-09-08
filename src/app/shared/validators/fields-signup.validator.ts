import {AbstractControl} from '@angular/forms';

export function fieldsSignupValidator(control: AbstractControl ): any{

  if (!control.value.length){
    return {validadorPersonalizado: true};
  }
  return null;
}
