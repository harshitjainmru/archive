import { Pipe, PipeTransform } from '@angular/core';
interface IArrayOperator{
  key:string,
  operator:string
}

@Pipe({
  name: 'arrayOperator'
})
export class ArrayOperatorPipe implements PipeTransform {

  /* accumulate sum of all the keys and return the sum value if the operator is '+' */

  transform(el:Object,keys:IArrayOperator, ...args: unknown[]): string|number|Date|Object {
    if(keys.operator=="+"){
      return  Object.values(el).reduce(function (accumulator, current) {
        return accumulator + current[keys.key];
    });
    }
    return el;
  }

}
