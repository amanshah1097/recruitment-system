import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CoreHttpService } from '../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';
import { CoreHelperService } from '../core/core-helper.service';

@Injectable()
export class L1PanelService {
    baseUrl: string = 'http://localhost:54115/api/';
    l1panelUrl: string = this.baseUrl + 'l1panel/';

    constructor(
        private corehttpservice: CoreHttpService,
    )  {}
   
    postL1PanelDetails(l1panelData) {
        return this.corehttpservice.postRequest<any, void>(this.l1panelUrl + 'l1Panel/', l1panelData);
    }
  
}