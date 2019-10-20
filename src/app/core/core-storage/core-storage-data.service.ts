import { Injectable, Inject } from '@angular/core';
import { GLOBAL_SET_STORAGE } from './core-storage.factory';
import { ICoreStorageService } from './core-storage.service';
import { LocalStorageKey } from '../core.classes';

@Injectable()
export class CoreStorageDataService {

    constructor(@Inject(GLOBAL_SET_STORAGE) private storage: ICoreStorageService) { }

    get token() {
        return this.storage.getString(LocalStorageKey.TOKEN)
    }

    set token(tokenValue: string) {
        this.storage.set(LocalStorageKey.TOKEN, tokenValue);
    }
}
