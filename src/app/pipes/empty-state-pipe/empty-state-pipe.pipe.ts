import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyStatePipe'
})
export class EmptyStatePipePipe implements PipeTransform {

  
  transform(value:any, obj): unknown {
    console.log(value)
    if(!obj){
      return value;
    }
    return obj[value];
  }
}
