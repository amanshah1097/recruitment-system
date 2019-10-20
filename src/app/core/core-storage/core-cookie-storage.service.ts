import { ICoreStorageService } from './core-storage.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CoreCookieStorageService implements ICoreStorageService {

    constructor(private cookieService: CookieService) {
    }

    get<T>(key: string): T {
        try {
            return this.deserializeObject<T>(this.cookieService.get(key));
        } catch {
            return null;
        }
    }

    getString(key: string): string {
        return this.cookieService.get(key);
    }

    set<T>(key: string, value: T, expiryTime?: number, path: string = '/', domain?: string): void {
        this.cookieService.set(key, this.serializeObject(value), expiryTime, path, domain);
    }

    remove(key: string, path: string = '/', domain?: string): void {
        this.cookieService.delete(key, path, domain);
    }

    removeAll(path: string = '/', domain?: string): void {
        this.cookieService.deleteAll(path, domain);
    }

    private serializeObject<T>(object: T) {
        return JSON.stringify(object);
    }

    private deserializeObject<T>(jsonString: string) {
        return JSON.parse(jsonString) as T;
    }
}
