
import { HttpHeaders, HttpParams } from '@angular/common/http';

export class RequestOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    constructor(initializer: Partial<RequestOptions>) {
        if (!!initializer) { Object.assign(this, initializer); }
    }
}

export class ConstantKey {
    static readonly TOKENHEADERNAME = 'Authorization';
}

export class LocalStorageKey {
    static readonly TOKEN = 'token'
}

export class GenericBlobPropertyClass {
    [key: string]: string | Blob;
}

export class HttpRequestParams {
    [key: string]: string | number;
}
export class IdNameModel {
    id: number;
    name: string;
}
export type Action0 = () => void;
export type Action1<T> = (item: T) => void;
export type Action2<T1, T2> = (item1: T1, item2: T2) => void;
export type Action3<T1, T2, T3> = (item1: T1, item2: T2, item3: T3) => void;
export type Func0<T1> = () => T1;
export type Func1<T1, T2> = (item: T1) => T2;
export type Func2<T1, T2, T3> = (item1: T1, item2: T2) => T3;
export type Func3<T1, T2, T3, T4> = (item1: T1, item2: T2, item3: T3) => T4;
