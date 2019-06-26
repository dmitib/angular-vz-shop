import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MinDateDirective } from './directives/min-date.directive';
import { ValidateAddressService } from './services/validate-address.service';
import { ValidAddressDirective } from './directives/valid-address.directive';

@NgModule({
  declarations: [MinDateDirective, ValidAddressDirective],
  providers: [ValidateAddressService],
  imports: [CommonModule],
  exports: [MinDateDirective, ValidAddressDirective]
})
export class ValidatorsModule {}
