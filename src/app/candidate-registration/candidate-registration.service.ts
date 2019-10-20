import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CoreHttpService } from '../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';
import { CoreHelperService } from '../core/core-helper.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CandidateRegistrationService {
    baseUrl: string = 'http://localhost:8080/api/';
    candidateRegistrationUrl: string = this.baseUrl + 'candidateregistration';

    constructor(
        private corehttpservice: CoreHttpService,
        private http: HttpClient
    )  {}
   
    postCandidateDetails(candidateData) {
        return this.corehttpservice.postRequest<any, void>(this.candidateRegistrationUrl + 'CreateCandidate/', candidateData);
    }
    getCandidateDetails() {
        debugger;
        return this.http.get('http://localhost:8080/api/candidateregistration/getAll');
    }
  
}