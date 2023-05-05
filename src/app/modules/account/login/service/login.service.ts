import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  constructor() {}

  //This will get error message
  getErrorType(type: string) {
    switch (type) {
      case 'NO_INTERNET':
        return 0;
      case 'PHONE_NOT_VERIFIED':
        return 1;
      case 'ACCOUNT_BLOCKED':
        return 2;
      case 'NOT_FOUND_USER':
        return 4;
      case 'INCORRECT_PASSWORD':
        return 4;
      case 'USER_TYPE_NOT_ALLOWED':
        return 5;
      default:
        return 9;
    }
  }
}
