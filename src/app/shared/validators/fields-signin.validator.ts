import {FormGroup, ValidatorFn} from "@angular/forms";

export const userNamePassword :ValidatorFn = (formgroup:FormGroup)=> {
  const userName = formgroup.get('userName').value;
  const password = formgroup.get('password').value;

  return userName !== password
    ? null
    : { userNamePassword:true }
}
