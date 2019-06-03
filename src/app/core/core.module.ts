import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantsService, GeneratorService } from './services';
import { constantsService } from './models/constants';
import { generator10, generatorFactory } from './services/generator-factory';

@NgModule({
  declarations: [],
  providers: [
    GeneratorService,
    {
      provide: ConstantsService,
      useValue: constantsService
    },
    {
      provide: generator10,
      useFactory: generatorFactory(10),
      deps: [GeneratorService]
    }
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
