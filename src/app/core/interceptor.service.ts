import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ConstantKey, LocalStorageKey } from './core.classes';
import { CoreStorageDataService } from './core-storage/core-storage-data.service';
import { CoreHelperService } from './core-helper.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
      private storageDataService: CoreStorageDataService,
      private helper: CoreHelperService
      ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.getHeaderFromLocalStorage(ConstantKey.TOKENHEADERNAME);
    request = request.clone({
      headers: this.headers
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.setHeaderInLocalStorage(event, ConstantKey.TOKENHEADERNAME);
        }
        return event;
      }),
      catchError(this.handleError));
  }
  public setHeaderInLocalStorage<TResponse>(response: HttpResponse<TResponse>, headerNameToSave: string) {
    const headers = response.headers;
    if (headers.has(headerNameToSave)) {
      const headerValue = headers.get(headerNameToSave);
      this.storageDataService.token = headerValue;
      return true;
    }
    return false;
  }

  public getHeaderFromLocalStorage(headerName: string) {
    const token = this.storageDataService.token;
    if (!!token) {
      this.headers = this.headers.set(headerName, token);
    } else {
      this.headers = this.headers.set(headerName, '');
    }
  }



  private handleError = (error: HttpErrorResponse) => {
    let message: string;
    if (!this.helper.isStringNullOrWhitespace(error.error.message)) {
      if (error.status === 401) {
        message = error.error.message;
      }
    } else if (error.status === 404) {
      message = 'Sorry! Data was not found!';
    } else if (error.status === 500) {
      message = error.statusText;
    } else if (error.status === 409) {
      message = 'Conflict!';
    } else if (error.status === 401) {
      message = 'You are trying to access something you are not authorized!';
    } else {
      message = 'Oops! Something broke! Following points might be the causes. \n1) slow internet speed. 2) unexpected inputs. 3) some issue on server side.';
    }
    // this.helper.alert('Alert', '', message, 'OK');
    return throwError(message);
  }

}
