import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CoreHttpService } from '../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';
import { CoreHelperService } from '../core/core-helper.service';

@Injectable()
export class PanelService {
    baseUrl: string = 'http://localhost:54115/api/';
    panelUrl: string = this.baseUrl + 'panel/';

    constructor(
        private corehttpservice: CoreHttpService,
    )  {}
   
    postPanelDetails(panelData) {
        return this.corehttpservice.postRequest<any, void>(this.panelUrl + 'CreatePanel/', panelData);
    }
  
}