import { Pipe, PipeTransform } from '@angular/core';
import { EMAIL, IMAGE, LOGIN, MOBILE, OTP, PASSWORD, RESET_PASSWORD } from './error-types';

@Pipe({
  name: 'backendError'
})
export class BackendErrorPipe implements PipeTransform {

  //error message displayed  in html that are fetched from error-types.ts  file

  transform(errors: any, type: string, ctrlName?: string): string {
    
    
    if (errors) {
      const errorName: string = Object.keys(errors)[0];
      switch (type) {
        case 'EMAIL':
          return EMAIL[errorName];
        case 'PASSWORD':
          return PASSWORD[errorName];
        case 'MOBILE':
          return MOBILE[errorName];
        case 'RESET_PASSWORD':
          return RESET_PASSWORD[errorName];
        case 'OTP':
          return OTP[errorName];
        case 'LOGIN':
          return LOGIN[errorName];
        case 'IMAGE':
          return `${ctrlName} ${IMAGE[errorName]}`;
        default:
          return;
      }
    }
  }

}
