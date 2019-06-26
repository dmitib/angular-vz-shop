import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidators } from '../custom.validators';

@Directive({
  selector: '[appMinDateValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinDateDirective,
      multi: true
    }
  ]
})
export class MinDateDirective implements Validator {
  @Input('appMinDateValidator') minDate: Date;
  validate(c: AbstractControl): ValidationErrors | null {
    const validatorFn = CustomValidators.minDate(this.minDate);
    return validatorFn(c);
  }
}
