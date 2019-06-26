import { Directive } from '@angular/core';
import {
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  AbstractControl,
  Validator
} from '@angular/forms';

import { Observable } from 'rxjs';

import { ValidateAddressService } from '../services/validate-address.service';
import { CustomValidators } from '../custom.validators';

@Directive({
  selector: '[appValidAddress][formControlName],[appValidAddress][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidAddressDirective,
      multi: true
    }
  ]
})
export class ValidAddressDirective implements Validator {
  constructor(private validAddressService: ValidateAddressService) {}
  validate(
    c: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> {
    const asyncValidatorFn = CustomValidators.validAddress(
      this.validAddressService
    );

    return asyncValidatorFn(c);
  }
}
