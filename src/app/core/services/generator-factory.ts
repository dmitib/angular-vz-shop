import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator.service';

export const generator10 = new InjectionToken<string>('generator10');

export function generatorFactory(n: number) {
  return (generatorService: GeneratorService): string => {
    return generatorService.getSequence(n);
  };
}
