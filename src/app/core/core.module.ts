import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstantsService, GeneratorService } from './services';
import { constantsService } from './models/constants';
import { generator10, generatorFactory } from './services/generator-factory';
import { AppSettingsService } from './services/app-settings.service';
import { LocalStorageService } from './services/local-storage.service';
import { AppSettings$, appSettingsFactory } from './services/app-settings-factory';
import { JsonServerClientService } from './services/json-server-client.service';
import { JsonServerApiProvider } from './services/json-server.config';
import { CoreStoreModule } from './state/core-store.module';

@NgModule({
  declarations: [],
  providers: [
    AppSettingsService,
    LocalStorageService,
    GeneratorService,
    JsonServerClientService,
    JsonServerApiProvider,
    {
      provide: ConstantsService,
      useValue: constantsService
    },
    {
      provide: generator10,
      useFactory: generatorFactory(10),
      deps: [GeneratorService]
    },
    {
      provide: AppSettings$,
      useFactory: appSettingsFactory(),
      deps: [AppSettingsService]
    }
  ],
  imports: [
    CommonModule,
    CoreStoreModule
  ]
})
export class CoreModule { }
