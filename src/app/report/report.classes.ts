
import * as moment from 'moment';

    export class PmsReport {
        year: number;
        week: number;
        projectId: number;
        projectName: string;
        componentId: number;
        componentName: string;
        firstPlanHours: number;
        lastPlanHours: number;
        actualLogHours: number;
        burningValuePercentage: number;
        earningValuePercentage: number;
        constructor(initializer?: Partial<PmsReport>) {
            if (!!initializer) { Object.assign(this, initializer); }
        }
    }
    export class Module {
        projectId: number;
        projectName: string;
        componentId: number;
        componentName: string;
        year: number;
        weekList = Module.weekInitializer(this.year);
        constructor(initializer?: Partial<Module>) {
            if (!!initializer) { Object.assign(this, initializer); }
        }
        static weekInitializer = (year: number) => {
            //  var weekNumberData: number[] = Array.from({ length: moment().week() }, (v, k) => k + 1).reverse();
            var weekNumberData: number[] = Array.from({ length: moment(year + '-12-31').weeksInYear() }, (v, k) => k + 1).reverse();
            var weekData: Array<Week> = new Array<Week>();
            // _.each(weekNumberData, weekNmbr => {
            //     weekData.push({
            //         week: weekNmbr,
            //         firstPlanHours: null,
            //         lastPlanHours: null,
            //         actualLogHours: null,
            //         burningValuePercentage: null,
            //         earningValuePercentage: null,
            //     })
            // });

weekNumberData.forEach(weekNmbr =>{
weekData.push({
    week: weekNmbr,
    firstPlanHours: null,
    lastPlanHours:null,
    actualLogHours: null,
             burningValuePercentage: null,
            earningValuePercentage: null,
})
});


            return weekData;
        }
    }
    export class Project {
        projectId: number;
        projectName: string;
        year: number;
        componentId: number;
        weekList = Module.weekInitializer(this.year);
        constructor(initializer?: Partial<Module>) {
            if (!!initializer) { Object.assign(this, initializer); }
        }
        static weekInitializer = () => {
            var weekNumberData: number[] = Array.from({ length: moment().week() }, (v, k) => k + 1).reverse();
            var weekData: Array<Week> = new Array<Week>();

            weekNumberData.forEach(weekNmbr =>{
                weekData.push({
                    week: weekNmbr,
                    firstPlanHours: null,
                    lastPlanHours:null,
                    actualLogHours: null,
                             burningValuePercentage: null,
                            earningValuePercentage: null,
                })
                });
            return weekData;
        }
    }

    export class Week {
        week: number;
        firstPlanHours: number;
        lastPlanHours: number;
        actualLogHours: number;
        burningValuePercentage: number;
        earningValuePercentage: number;
        constructor(initializer?: Partial<Week>) {
            if (!!initializer) { Object.assign(this, initializer); }
        }
    }

    export class Employee {
        employeeId: number;
        employeeName: string;
        employeeCode: number;
        joiningDate: Date;
        emailAddress: string;
        employeeRate: number;
        currencyId: number;
        currencyCode: string;
        isActive: boolean;
        employeeType: number;
        constructor(initializer?: Partial<Employee>) {
            if (!!initializer) { Object.assign(this, initializer); }
        }
    }

    export class ProjectTotalFLA {

        constructor(init?: Partial<ProjectTotalFLA>) {
            if (!!init) { Object.assign(this, init); }
        }
    }

    export class EmployeeList {
        id: number;
        employeeId: number;
        employeeName: string;
        constructor(initializer?: Partial<EmployeeList>) {
            if (!!initializer) { Object.assign(this, initializer); }
        }

    }
    export class chartColor {
        static firstPlan: string = '#ff7f00';
        static lastPlan: string = '#ea4335';
        static actualPlan: string = '#34a853';
        static burnValue: string = '#e26b1c';
        static earnValue: string = '#0662E8';
    }
    export interface IChartDataSet {
        chartName: string;
        chartCode: string;
        data: Array<Array<number>>;
        label: Array<string>;
        borderColor: Array<string>;
        borderWidth: number;
        fill: boolean;
        pointRadius: number;
        pointBackgroundColor: Array<string>;
        isEmployeeChart: boolean;
        chartDataCallbacks: ((week: Week) => number)[];
        xLabel: string;
        yLabel: string;
        yAxisDataPointLabel: string[];
    }

    export class FirstVsActualPlan implements IChartDataSet {

        isEmployeeChart = false;
        data: Array<Array<number>> = [];
        chartCode = 'FVA';
        chartName = 'First Plan vs Actual Plan';
        label: Array<string> = ['First Plan', 'Actual plan'];
        borderColor: Array<string> = [chartColor.firstPlan, chartColor.actualPlan];
        borderWidth: number = 5;
        fill: boolean = false;
        pointRadius: number = 3;
        pointBackgroundColor: Array<string> = [chartColor.firstPlan, chartColor.actualPlan];
        chartDataCallbacks = [(x => x.firstPlanHours), (x => x.actualLogHours)];
        xLabel = 'Hours';
        yLabel = 'Week Number';
        yAxisDataPointLabel = [];
    }

    export class LastVsActualPlan implements IChartDataSet {
        isEmployeeChart = false;
        data: Array<Array<number>> = [];
        chartCode = 'LVA';
        chartName = 'Last Plan vs Actual Plan';
        label: Array<string> = ['Last Plan', 'Actual plan'];
        borderColor: Array<string> = [chartColor.lastPlan, chartColor.actualPlan];
        borderWidth: number = 5;
        fill: boolean = false;
        pointRadius: number = 3;
        pointBackgroundColor: Array<string> = [chartColor.lastPlan, chartColor.actualPlan];
        chartDataCallbacks = [(x => x.lastPlanHours), (x => x.actualLogHours)];
        xLabel = 'Hours';
        yLabel = 'Week Number';
        yAxisDataPointLabel = [];
    }

    export class FirstVsLastVsActualPlan implements IChartDataSet {
        isEmployeeChart = false;
        data: Array<Array<number>> = [];
        chartCode = 'FVLVA';
        chartName = 'First Vs Last Vs Actual Plan';
        label: Array<string> = ['First Plan', 'Last Plan', 'Actual Plan'];
        borderColor: Array<string> = [chartColor.firstPlan, chartColor.lastPlan, chartColor.actualPlan];
        borderWidth: number = 5;
        fill: boolean = false;
        pointRadius: number = 3;
        pointBackgroundColor: Array<string> = [chartColor.firstPlan, chartColor.lastPlan, chartColor.actualPlan];
        chartDataCallbacks = [(x => x.firstPlanHours), (x => x.lastPlanHours), (x => x.actualLogHours)];
        xLabel = 'Hours';
        yLabel = 'Week Number';
        yAxisDataPointLabel = [];
    }

    export class BurnVsEarnValue implements IChartDataSet {
        isEmployeeChart = false;
        data: Array<Array<number>> = [];
        chartCode = 'BVE';
        chartName = 'Burn value vs Earn value';
        label: Array<string> = ['Burn value', 'Earn value'];
        borderColor: Array<string> = [chartColor.burnValue, chartColor.earnValue];
        borderWidth: number = 5;
        fill: boolean = false;
        pointRadius: number = 3;
        pointBackgroundColor: Array<string> = [chartColor.burnValue, chartColor.earnValue];
        chartDataCallbacks = [(x => x.burningValuePercentage), (x => x.earningValuePercentage)];
        xLabel = 'Percentage';
        yLabel = 'Week Number';
        yAxisDataPointLabel = [];
    }

    export class UserJiraCount {
        projectId: number;
        issueCount: number;
        logUserCount: number;
    }

    export class YearPmsReport {
        initialYear: number;
        displayName: string;
    }
    export class ReportData {
        reportList: Array<PmsReport>;
        userJiraCount: Array<UserJiraCount>;
        constructor(initializer?: Partial<ReportData>) {
            if (!!initializer) { Object.assign(this, initializer);
            }
        }
    }

    export class IdNameModule {
        moduleId: number;
        moduleName: string;
    }

    export class IdNameModel implements IdNameModule {
        projectId: number;
        moduleId: number;
        moduleName: string;
        projectName: string;
        isPms?: boolean;
        jiraInstanceId?: number;
        mappingProjectId?: number;
        constructor(initializer?: Partial<IdNameModel>) {
            if (!!initializer) { Object.assign(this, initializer); }
        }
    }

    export class IdNameProject {
        projectId: number;
        projectName: string;
        IsPms?: boolean;
        MappingProjrctId?: number;
        JiraIstanceId?: number;

    }
