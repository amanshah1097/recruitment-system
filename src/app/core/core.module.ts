import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { CoreConfigurationService } from './core-configuration.service';
import { CoreHelperService } from './core-helper.service';
import { CoreHttpService } from './core-http.service';
import { CoreCookieStorageService } from './core-storage/core-cookie-storage.service';
import {
    COOKIE_STORAGE,
    LOCAL_STORAGE,
    MEMORY_STORAGE,
    SESSION_STORAGE,
    storageFactory,
    StorageType,
} from './core-storage/core-storage.factory';
import { FormValidationService } from './form-validation.service';
import { CoreStorageDataService } from './core-storage/core-storage-data.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [
    ],
    providers: [
        CoreHttpService,
        CoreHelperService,
        CoreCookieStorageService,
        { provide: SESSION_STORAGE, useFactory: () => storageFactory(StorageType.Session) },
        { provide: LOCAL_STORAGE, useFactory: () => storageFactory(StorageType.Local) },
        { provide: MEMORY_STORAGE, useFactory: () => storageFactory(StorageType.Memory) },
        { provide: COOKIE_STORAGE, useFactory: () => storageFactory(StorageType.Cookie) },
        FormValidationService,
        CookieService,
        CoreConfigurationService,
        CoreStorageDataService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ],
})
export class CoreModule { }
