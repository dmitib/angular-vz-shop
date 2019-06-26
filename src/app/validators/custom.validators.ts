import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn
} from '@angular/forms';

import { ValidateAddressService } from './services/validate-address.service';

export class CustomValidators {
  static minDate(date: Date): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value) {
        return null;
      }

      const value = new Date(c.value);

      if (value < date) {
        return {
          minDate: true
        };
      }

      return null;
    };
  }

  static validAddress(validAddressService: ValidateAddressService): AsyncValidatorFn {
    return async (c: AbstractControl): Promise<ValidationErrors | null> => {
      if (!c.value) {
        return null;
      }

      const isValid = await validAddressService.validate(c.value);
      return isValid ? null : { validAddress: true};
    };
  }
}
