import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  transform(value: Array<any>|Object, ...args: unknown[]): unknown {
    if(!Array.isArray(value)){
      console.log(value)
      const role=value["scrubbed"].slice(0,value['name'].length+1);
      console.log(role)
      return role
    }
    return value;
  }
  

}
