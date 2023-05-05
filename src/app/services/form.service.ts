import { Injectable } from '@angular/core';
import {
  Validators,
  AbstractControl,
  FormGroup,
  FormArray,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { PATTERN } from '../constants/patterns';
import { VALIDATION_CRITERIA } from '../constants/validation-criteria';
import { TranslateService } from './translate.service';
import { AccountService } from '../modules/account/account.service';
import { timer, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  // Custom Validators for match,lowerthan,higher,compare
  customValidators = {
    match(
      field: string,
      label?,
      parentControl?: FormGroup | FormArray
    ): ValidatorFn {
      return this.compare(
        field,
        'MATCH',
        label || field,
        parentControl
      )((a, b) => a === b);
    },
    lowerThan(
      field: string,
      label?,
      parentControl?: FormGroup | FormArray
    ): ValidatorFn {
      return this.compare(
        field,
        'LOWER',
        label || field,
        parentControl
      )((a, b) => a <= b);
    },
    higherThan(
      field: string,
      label?,
      parentControl?: FormGroup | FormArray
    ): ValidatorFn {
      return this.compare(
        field,
        'HIGHER',
        label || field,
        parentControl
      )((a, b) => a >= b);
    },
    compare(
      field: string,
      type: 'MATCH' | 'LOWER' | 'HIGHER',
      label,
      parentControl?: FormGroup | FormArray
    ) {
      return (fn: (a: any, b: any) => boolean) => {
        return (control: AbstractControl) => {
          if (control.value || control.value === 0) {
            const parent = parentControl ? parentControl : control.parent;
            if (parent) {
              const matchControl: AbstractControl = parent.controls[field];
              if (
                matchControl &&
                matchControl.errors &&
                matchControl.errors.compare
              ) {
                matchControl.updateValueAndValidity();
              }
              if (!matchControl) {
                throw new Error(
                  `Match Control [${label}] not found on parent control.`
                );
              }
              if (
                matchControl.dirty &&
                !fn(control.value, matchControl.value)
              ) {
                return {
                  compare: {
                    field: label,
                    type,
                  },
                };
              }
            }
          }
        };
      };
    },
  };

  // Use for form field validate
  VALIDATION = {
    name: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength),
    ],
    middleName: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength),
    ],
    companyName: [
      Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength),
    ],
    price: [
      Validators.pattern(PATTERN.price),
      Validators.minLength(VALIDATION_CRITERIA.priceMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.priceMaxLength),
      Validators.min(0),
    ],
    rangeMin: [Validators.pattern(PATTERN.price), Validators.min(1)],
    rangeMax: [Validators.pattern(PATTERN.price), Validators.min(1)],
    rangeFixed: [Validators.pattern(PATTERN.price), Validators.min(1)],
    email: [
      Validators.pattern(PATTERN.email),
      Validators.maxLength(VALIDATION_CRITERIA.emailMaxLength),
    ],
    description: [
      // Validators.pattern(PATTERN.name),
      // this.removeSpaces,
      Validators.minLength(VALIDATION_CRITERIA.descriptionMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.descriptionMaxLength),
    ],
    descriptionMax400: [
      Validators.minLength(VALIDATION_CRITERIA.descriptionMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.descriptionMaxLength400),
    ],
    descriptionMaxLength1200: [
      Validators.minLength(VALIDATION_CRITERIA.descriptionMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.descriptionMaxLength1200),
    ],
    ratingDescription: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.descriptionMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.descriptionMaxLength),
    ],
    rating: [],
    propertyId: [],
    bookingId: [],
    hostId: [],

    password: [
      Validators.pattern(PATTERN.password),
      Validators.minLength(VALIDATION_CRITERIA.passwordMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.passwordMaxLength),
    ],
    passwordRule: [
      Validators.pattern(PATTERN.passRegex),
      Validators.minLength(VALIDATION_CRITERIA.passwordMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.passwordMaxLength),
    ],
    phone: [
      Validators.pattern(PATTERN.phone),
      Validators.minLength(VALIDATION_CRITERIA.phoneMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.phoneMaxLength),
    ],
    dropdown: [],
    checkbox: [],
    houseNo: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.houseNumberMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.houseNumberMaxLength),
    ],
    street: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.streetMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.streetMaxLength),
    ],
    address: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.addressMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.addressMaxLength),
    ],
    landmark: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.landmarkMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.landmarkMaxLength),
    ],
    requiredOnly: [],
    zipCode: [
      Validators.pattern(PATTERN.phone),
      Validators.minLength(VALIDATION_CRITERIA.zipcodeMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.zipcodeMaxLength),
    ],
    zipCodeUser: [
      Validators.minLength(VALIDATION_CRITERIA.zipcodeMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.zipcodeMaxLength),
    ],
    taxNo: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.taxNumberMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.taxNumberMaxLength),
    ],
    regNo: [
      // Validators.pattern(PATTERN.name),
      Validators.minLength(VALIDATION_CRITERIA.regNumberMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.regNumberMaxLength),
    ],
    dob: [],
    subject: [
      Validators.minLength(VALIDATION_CRITERIA.bioMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.subjectMaxLength),
    ],
    subjectRequest: [Validators.minLength(3), Validators.maxLength(200)],
    subjectDescription: [Validators.minLength(3), Validators.maxLength(800)],
    uen: [
      Validators.pattern(PATTERN.alphaNumeric),
      Validators.minLength(VALIDATION_CRITERIA.uenMinLength),
      Validators.maxLength(VALIDATION_CRITERIA.uenMaxLength),
    ],
    webSite: [Validators.pattern(PATTERN.url)],
    optional: [],
    title: [
      Validators.minLength(VALIDATION_CRITERIA.mininviteTitleLength),
      Validators.maxLength(VALIDATION_CRITERIA.maxinviteTitleLength),
    ],
    message: [
      Validators.minLength(VALIDATION_CRITERIA.mininviteMsgLength),
      Validators.maxLength(VALIDATION_CRITERIA.maxinviteMsgLength),
    ],
  };

  // This will validate login
  debouncer: any;
  loginAsyncValidator = (
    authService: AccountService,
    bookingId,
    time: number = 500
  ) => {
    console.log({ bookingId });

    return (input: FormControl) => {
      const body = {
        email: input.value,
        bookingId,
      };

      return timer(time).pipe(
        switchMap(
          () => authService.validateEmail({ ...body }),
          (err) => {
            console.log({ err });
            return { loginExist: true };
          }
        ),
        map(
          (res) => {
            console.log({ res });

            return null;
          },
          (err) => {
            console.log({ err });
            return { loginExist: true };
          }
        )
      );
    };
  };

  // This will remove whitespace from sting
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  // This will remove space in a string and replace them with an empty string
  removeSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }

  // This will match password and confirmPassword value
  matchPassword(form: AbstractControl) {
    let password = form.get('password').value;
    let confirmPassword = form.get('confirmPassword').value;
    if (password !== confirmPassword) {
      form.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      if (password === confirmPassword) {
        if (form.get('confirmPassword').errors) {
          delete form.get('confirmPassword').errors['matchPassword'];
          let keys = Object.keys(form.get('confirmPassword').errors);
          if (keys.length === 0) {
            form.get('confirmPassword').setErrors(null);
          }
        }
      }
    }
  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // return null if controls haven't initialised yet
      if (!control || !matchingControl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // This will get control of form
  getControl(name, required = true, prefilled?) {
    if (prefilled === undefined) {
      prefilled = '';
    }
    let compose = [...this.VALIDATION[name]];
    if (required) {
      if (name === 'checkbox') {
        compose.splice(0, 0, Validators.requiredTrue);
      } else {
        compose.splice(0, 0, Validators.required);
      }
    }
    return [
      name === 'checkbox' ? false : prefilled,
      Validators.compose(compose),
    ];
  }

  // This will get filter form control
  getFilterFormControls(keys: string[]) {
    let form = {};
    for (let key of keys) {
      form[key] = [null];
    }
    return form;
  }

  // This will genrate control object
  genrateControlsObj(keyArray: Array<string>) {
    return keyArray.reduce((acc, curr) => {
      acc[curr] = [''];
      return acc;
    }, {});
  }
}

// This  will match required length
export const LENGTH_MATCH = (
  requiredLength: number,
  unit = TranslateService.data.DIGITS
): ValidatorFn => {
  return (control: AbstractControl) => {
    if (control.value && control.value.length != requiredLength) {
      return {
        lengthMatch: {
          requiredLength,
          unit,
        },
      };
    }
  };
};
