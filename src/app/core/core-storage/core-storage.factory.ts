import { InjectionToken } from '@angular/core';
import { CoreLocalStorageService } from './core-local-storage.service';
import { CoreMemoryStorageService } from './core-memory-storage.service';
import { ICoreStorageService } from './core-storage.service';
import { CoreCookieStorageService } from './core-cookie-storage.service';
import { CookieService } from 'ngx-cookie-service';

export const SESSION_STORAGE = new InjectionToken<ICoreStorageService>('SESSION_STORAGE');
export const LOCAL_STORAGE = new InjectionToken<ICoreStorageService>('LOCAL_STORAGE');
export const MEMORY_STORAGE = new InjectionToken<ICoreStorageService>('MEMORY_STORAGE');
export const COOKIE_STORAGE = new InjectionToken<ICoreStorageService>('COOKIE_STORAGE');

export const GLOBAL_SET_STORAGE = LOCAL_STORAGE;

export const storageFactory = (storageType: StorageType): ICoreStorageService => {
    switch (storageType) {
        case StorageType.Local:
            return new CoreLocalStorageService(localStorage);
        case StorageType.Session:
            return new CoreLocalStorageService(sessionStorage);
        case StorageType.Cookie:
            return new CoreCookieStorageService(new CookieService(document));
        default:
            return new CoreMemoryStorageService();
    }
}

export enum StorageType {
    Local,
    Session,
    Memory,
    Cookie
}
