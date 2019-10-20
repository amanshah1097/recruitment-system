import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CoreHttpService } from '../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';
import { CoreHelperService } from '../core/core-helper.service';

@Injectable()
export class DriveService {
    baseUrl: string = 'http://localhost:8080/api/';
    driveUrl: string = this.baseUrl + 'drive/';

    constructor(
        private corehttpservice: CoreHttpService,
    )  {}
   
    postDriveDetails(driveData) {
        return this.corehttpservice.postRequest<any, void>(this.driveUrl + 'CreateDrive/', driveData);
    }
  
}