import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CoreHttpService } from '../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';
import { Dsr, DsrTaxWeekMonthMappingData, DsrFilterServiceModal } from './dailystatusreportclasses';
import { CoreHelperService } from '../core/core-helper.service';

@Injectable()
export class DailyStatusReportService {
    baseUrl: string = 'http://localhost:54115/api/';
    timeSheetUrl: string = 'http://localhost:54115/api/TimeSheet/';
    dsrUrl: string = this.baseUrl + 'DSR/';

    constructor(private corehttpservice: CoreHttpService,
        private coreHelperService: CoreHelperService) {
    }
   
    deleteComment(id: number) {
        return this.corehttpservice.getRequest(this.dsrUrl + 'DeleteDailyStatusReport?id=' + id);
    }

    getDsrList(dsrFilter:DsrFilterServiceModal) {
        return this.corehttpservice.postRequest(this.dsrUrl + 'GetDsrList',dsrFilter);
    }

    getDsrById(id: number) {
        return this.corehttpservice.getRequest<Dsr>(this.dsrUrl + 'GetDsrById?dsrId=' + id);
    }

    postComment(dsrData: Dsr) {
        return this.corehttpservice.postRequest<Dsr, void>(this.dsrUrl + 'CreateDsr/', dsrData);
    }
    getTaxWeekMonthMappingData(taxYear:number) {
        return this.corehttpservice.getRequest(this.dsrUrl + 'GetDsrTaxWeekAndDateMappingData?taxYear='+taxYear);
    }
    getCurrentTaxWeekNumber = ()=>{
        let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    return this.corehttpservice.getRequest(this.dsrUrl + 'GetWeekNumber?currentDate='+currentDate);
    }

}