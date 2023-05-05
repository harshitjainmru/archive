import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";

@Pipe({
  name: "getControl",
})
export class GetControlPipe implements PipeTransform {

  /*
  Returns getFormControl as a string by just passing the values in the  
  pipe instead of using the syntax this.formGroup.get('formConntrolName')
  */

  
  transform(control: AbstractControl, paths: string[]): null | FormControl {
    // debugger;
    return paths.reduce((fg: AbstractControl, name: string) => {
      // debugger;
      return fg.get(`${name}`);
    }, control) as FormControl;
  }
}
