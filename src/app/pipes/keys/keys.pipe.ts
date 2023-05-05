import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "keys"
})
export class KeysPipe implements PipeTransform {

  /*
  returns an array of a given object's  property names(key in key-value pair) , 
  iterated in the same order that a normal loop would.
  Here the object is value.
  */

  transform(value: any): string[] {
    return Object.keys(value);
  }
}
