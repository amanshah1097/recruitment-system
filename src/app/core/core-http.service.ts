import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Rx';

import { CoreHelperService } from './core-helper.service';
import { GLOBAL_SET_STORAGE } from './core-storage/core-storage.factory';
import { ICoreStorageService } from './core-storage/core-storage.service';
import { GenericBlobPropertyClass, HttpRequestParams, RequestOptions } from './core.classes';

@Injectable()
export class CoreHttpService {

    constructor(private http: HttpClient,
        private router: Router,
        @Inject(GLOBAL_SET_STORAGE) private storage: ICoreStorageService,
        private toaster: ToastrService,
        private helper: CoreHelperService) { }

    getRequest = <TResponse>(apiUrl: string): Observable<TResponse> => {
        debugger;
        return this.http.get<TResponse>(apiUrl)
        .map((res) => res)
        .catch((e: HttpErrorResponse) => this.handleError(e));
    }

    getRequestWithParameters = <TParameterObject extends HttpRequestParams, TResponse>(apiUrl: string, parameterObject: TParameterObject): Observable<TResponse> => {
        const requestParams = this.getParametersFromObject(parameterObject);
        return this.http.get<TResponse>(apiUrl, { params: requestParams })
            .map((res) => res)
            .catch((e: HttpErrorResponse) => this.handleError(e));
           // .catch(this.handleError);
    }

    postRequest = <TRequest, TResponse>(apiUrl: string, tRequest: TRequest): Observable<TResponse> => {
        return this.http.post<TResponse>(apiUrl, tRequest)
            .map((res) => res)
            .catch((e: HttpErrorResponse) => this.handleError(e));
    }

    putRequest = <TRequest, TResponse>(apiUrl: string, tRequest: TRequest): Observable<TResponse> => {
        return this.http.put<TResponse>(apiUrl, tRequest)
            .map((res) => res)
            .catch((e: HttpErrorResponse) => this.handleError(e));
    }

    deleteRequest = <TResponse>(apiUrl: string): Observable<TResponse> => {
        return this.http.delete<TResponse>(apiUrl)
            .map((res) => res)
            .catch((e: HttpErrorResponse) => this.handleError(e));
    }

    postFileRequest = <TRequest extends GenericBlobPropertyClass, TResponse>(apiUrl: string, tRequest: TRequest,
        fileMapper: Map<string, File>): Observable<TResponse> => {
        const formData: FormData = this.initializeFormData<TRequest>(fileMapper, tRequest);
        this.appendToFormData(formData, tRequest);
        return this.http.post<TResponse>(apiUrl, formData)
            .map(res => res)
            .catch((e: HttpErrorResponse) => this.handleError(e));
    }

    putFileRequest = <TRequest extends GenericBlobPropertyClass, TResponse>(apiUrl: string, tRequest: TRequest,
        fileMapper: Map<string, File>): Observable<TResponse> => {
        const formData: FormData = this.initializeFormData<TRequest>(fileMapper, tRequest);
        // const requestOptions = this.getRequestOptionsForFile();
        return this.http.put<TResponse>(apiUrl, formData)
            .map(res => res)
            .catch((e: HttpErrorResponse) => this.handleError(e));
    }

    createObservable = <TResponse>(response: TResponse): Observable<TResponse> => {
        return Observable.of(response);
    }

    private appendToFormData = <TRequest extends GenericBlobPropertyClass>(formData: FormData, tRequest: TRequest) => {
        for (const property in tRequest) {
            if (!!property && tRequest.hasOwnProperty(property)) {
                formData.append(property, tRequest[property]);
            }
        }
    }

    private handleError = <TResponse>(error: HttpErrorResponse): ErrorObservable<TResponse> => {
        if (error.status === 422) {
            Object.keys(error.error.errors).map(e => this.toaster.error(e + `: ` + error.error.errors[e]));
            return new ErrorObservable();
        }
        if (error.error instanceof ErrorEvent) {
            console.error('Oops! Something broke:', error.error.message);
        } else {
            if (this.helper.isNullOrUndefined(error.error) || this.helper.isNullOrUndefined(error.error.error)) {
                this.toaster.error(error.statusText);
            } else {
                this.toaster.error(error.error.error);
            }
            console.error(
                `Status: ${error.status}, ` +
                `Error: `, error.error);
            if (error.status === 401) {
                this.storage.removeAll();
                this.router.navigate(['/login']);
            }


        }
        return new ErrorObservable<TResponse>();
    };

    getProperty = <T, K extends keyof T>(value: T, key: K) => {
        return value[key];
    }

    private getParametersFromObject = <TParameterObject extends HttpRequestParams>(parameterObject: TParameterObject): HttpParams | {
        [param: string]: string | string[];
    } => {
        let requestParams = new HttpParams();
        const properties = Object.keys(parameterObject);

        for (const key of properties) {
                const value = parameterObject.hasOwnProperty(key) ? parameterObject[key] : null;
                if (value === null || value === undefined) {
                    continue;
                }
                requestParams = requestParams.append(key, value as string);
        }
        return requestParams;
    }



    private getRequestOptionsForFile() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        const requestOptions = new RequestOptions({ headers: headers });
        return requestOptions;
    }

    private initializeFormData<TRequest extends GenericBlobPropertyClass>(fileMapper: Map<string, File>, tRequest: TRequest) {
        const formData: FormData = new FormData();
        fileMapper.forEach((value, key) => {
            formData.append(key, value, value.name);
        });
        this.appendToFormData(formData, tRequest);
        return formData;
    }
}
