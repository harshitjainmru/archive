import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlError',
})
export class ControlErrorPipe implements PipeTransform {
  // This will use for error message
  transform(errorName: any, controlName: string, customMessage?: any): any {
    if (errorName) {
      const ctrl: string = Object.keys(errorName)[0];
      switch (ctrl) {
        case 'required':
          return `${controlName} is required.`;
        case 'maxlength':
          return `${controlName} can not be more than ${errorName.maxlength.requiredLength} characters long.`;
        case 'minlength':
          return `${controlName} must be at least ${errorName.minlength.requiredLength} characters long.`;
        case 'min':
          return `${controlName} must be greater then ${errorName.min.min}.`;
        case 'max':
          return `${controlName} must be less then or equal to ${errorName.max.max}.`;
        case 'pattern':
          return (
            customMessage ||
            `Please enter a valid ${controlName.toLocaleLowerCase()}.`
          );
        case 'mustMatch':
          return `New Password and Confirm Password do not match.`;
        case 'owlDateTimeMin':
          return `Scheduled date and time has passed.`;
        default:
          return `Please define your validation message!`;
      }
    }
  }
}
