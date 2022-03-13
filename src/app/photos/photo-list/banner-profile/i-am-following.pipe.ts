import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name:'iamFollowing'})
export class iamFollowing implements PipeTransform{
  transform(followings, users_name) {
    console.log(followings)

    if(followings){
      return followings.filter((data) => { return (data.users.users_name === users_name); }).length;
    }
  }
  
}
