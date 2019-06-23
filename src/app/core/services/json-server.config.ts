import { InjectionToken } from '@angular/core';

const jsonServerUrl = 'http://localhost:3000/';
export const JsonServerApi = new InjectionToken<string>('JsonServerApi');

export const JsonServerApiProvider = {
  provide: JsonServerApi,
  useValue: jsonServerUrl
};
