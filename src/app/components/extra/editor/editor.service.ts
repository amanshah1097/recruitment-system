import { Injectable } from '@angular/core';

import { CoreHttpService } from '../../../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class EditorService {
    constructor(private corehttpservice: CoreHttpService) {

    }

    postComment(comment:string) {
        return this.corehttpservice.postRequest<any,void>('http://localhost:50518/api/', comment);
      }

    // getComments() {
    //     this.corehttpservice.getRequest("http://localhost:50518/api/");
    // }
}