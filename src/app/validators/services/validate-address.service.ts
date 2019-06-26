import { Injectable } from '@angular/core';

import { JsonServerClientService } from '../../core/services/json-server-client.service';
import { AppSettings } from '../../core/models/app-settings';

@Injectable()
export class ValidateAddressService {
  constructor(private jsonServerClient: JsonServerClientService) {}

  async validate(address: string): Promise<boolean> {
    const settings: AppSettings = await this.jsonServerClient
      .get<AppSettings>('settings')
      .toPromise()
      .catch(this.handleError);

    const addresses = settings.addresses;

    return addresses.includes(address);
  }

  private handleError(error: { message?: string }): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
