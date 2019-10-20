import { Injectable } from '@angular/core';

import { CoreHttpService } from '../core/core-http.service';
import { Observable } from 'rxjs/internal/Observable';
import { IdNameModule, IdNameProject, ReportData, FirstVsActualPlan, LastVsActualPlan, FirstVsLastVsActualPlan, BurnVsEarnValue, IChartDataSet } from './report.classes';
import { CoreHelperService } from '../core/core-helper.service';

@Injectable()
export class ReportService {

    chartsArray: Array<IChartDataSet>;

    baseUrl: string = 'http://localhost:54115/api/';
employeeurl: string = this.baseUrl + 'Employee/';
projectUrl: string = this.baseUrl + 'Project/';
moduleUrl: string = this.baseUrl + 'Module/';
firstLastActualPlanReportUrl: string  = this.baseUrl + 'PmsCustomReport/';

readonly defaultSelectedProjectId = 12100;
readonly defaultSelectedModuleId = 0;
readonly defaultSelectedChart = 22;
readonly defaultYear = 2018;

    constructor(private corehttpservice: CoreHttpService,
        private coreHelperService: CoreHelperService) {
            this.chartsArray = new Array<IChartDataSet>();
            this.initializeCharts();
    }
    initializeCharts = () => {
        this.chartsArray.push(new FirstVsActualPlan);
        this.chartsArray.push(new LastVsActualPlan);
        this.chartsArray.push(new FirstVsLastVsActualPlan);
        this.chartsArray.push(new BurnVsEarnValue);
    }

    getAllEmployee() {
        return this.corehttpservice.getRequest<Array<Object>>(this.employeeurl + 'GetAllEmployee');
    }

    GetProjectIdName() {
        return this.corehttpservice.getRequest<Array<IdNameProject>>(this.projectUrl + 'GetProjectList');
    }

    getModuleIdNameByProjectId(projectId: number) {
        return this.corehttpservice.getRequest<Array<IdNameModule>>(this.moduleUrl + 'GetModuleIdNameByProjectId?projectId=' + projectId);
    }

    getFirstLastActualPlanReport(projectId?: number, moduleId?: number, year?: number) {
        if (this.coreHelperService.isNullOrUndefined(projectId)) { projectId = this.defaultSelectedProjectId; moduleId = this.defaultSelectedModuleId }
        if (this.coreHelperService.isNullOrUndefined(moduleId)) { moduleId = this.defaultSelectedModuleId }
        if (this.coreHelperService.isNullOrUndefined(year)) { year = this.defaultYear }
        return this.corehttpservice.getRequest<ReportData>(this.firstLastActualPlanReportUrl + 'GetFirstLastActualPlanData?projectId=' + projectId + '&moduleId=' + moduleId + '&year=' + year);
    }


    assignOrUpdate = (source: number, target: number): number => {
        this.coreHelperService.isNullOrUndefined(target) || target <= 0 ? target = source : target += source;
        return target;
    }

}
