import { Injectable } from '@angular/core';

import { CoreHttpService } from '../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CommentService {
    baseUrl: string = 'http://localhost:50518/api/';

    constructor(private corehttpservice: CoreHttpService) {

    }

    postComment(comment: string) {
        return this.corehttpservice.postRequest<string, void>(this.baseUrl, comment);
    }
}