import {FormGroup, ValidatorFn} from "@angular/forms";

export const userNamePassword :ValidatorFn = (formgroup:FormGroup)=> {
  const firstName = formgroup.get('firstName').value;
  const password = formgroup.get('password').value;
  const confirmPassword = formgroup.get('confirmPassword').value;
  return firstName !== password && ( confirmPassword === password )
    ? null
    : { userNamePassword:true }
}
