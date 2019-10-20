import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { IdNameModule, IdNameModel, IdNameProject, YearPmsReport, ReportData, Week, IChartDataSet, Project, Module, PmsReport } from '../report.classes';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { CoreHelperService } from '../../core/core-helper.service';
import { _ } from 'core-js';
import * as lodash from 'lodash';
import { parse } from 'date-fns';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
// @Injectable()
export class ReportComponent implements OnInit {

  // declarations

  // true
  // weekNumberData: number[] = Array.from({ length: moment().week() }, (v, k) => k + 1).reverse();

  viewChart: boolean = false;

  lastWeekOfCurrentYear: number;
  weekValue: string;
  weekNumberData: number[] = [];
  chartLabel: string[] = this.weekNumberData.map(String).reverse();
  ctx: any;
  myChart: Chart;
  projectList: Array<Project>;
  moduleList: Array<Module> = [];
  projectOptions: Array<IdNameProject> = [];
  projectForm: FormGroup;
  project: FormGroup;
  message: string;
  formResult: { report: string };
  moduleOptions: Array<IdNameModule>
  chartOptions: IChartDataSet[] = [];
  selectedProject: IdNameProject;
  selectedModule: IdNameModule;
  selectedChart: IChartDataSet;
  employeeCount: number;
  jiraCount: number;
  yearList: YearPmsReport[] = [];
  selectedYear: number = null;
  currentYear: number;
  weekList: Week[] = [];
  weekDetails: Array<any> = [];
  reportData: ReportData;
  defaultSelected: string;
  constructor(
    private formBuilder: FormBuilder,
    private reportservice: ReportService,
    private httpclient: HttpClient,
    private coreHelperService: CoreHelperService,
  ) {
  }

  ngOnInit() {
    this.defaultSelected = 'Please select chart type';
    this.projectForm = new FormGroup({
      projectId: new FormControl(12100, Validators.required),
      moduleId: new FormControl(0, Validators.required),
      chartName: new FormControl(this.defaultSelected, Validators.required),
      year: new FormControl(2018, Validators.required),
    });

    this.reportservice.GetProjectIdName().subscribe(res => {
      this.projectOptions = res;
      this.getModuleDropDown();
      this.chartOptions = this.reportservice.chartsArray;
    });

    this.projectForm.valueChanges.subscribe((t) => {
      // this.selectedProject = t.projectId;
      this.selectedProject = this.projectOptions.find(e => {
        return e.projectId === parseInt(t.projectId);
      });

      this.selectedModule = this.moduleOptions.find(e => {
        return e.moduleId === parseInt(t.moduleId);
      });
     // this.selectedChart.chartName = t.chartName
      if (!this.coreHelperService.isNullOrUndefined(t.chartName)) {
        if (t.chartName === 'Please select chart type') {this.selectedChart = null; } else {
        for (let i = 0; i <= this.chartOptions.length - 1; i++) {
          if (this.chartOptions[i].chartName === t.chartName) {
            this.selectedChart = this.chartOptions[i];
          }
        }
        }

        this.selectedYear = parseInt(t.year);
        // this.createCalender();
        this.drawChart();
      }
    });


    this.reportservice.getFirstLastActualPlanReport().subscribe((response) => {
      if (!this.coreHelperService.isArrayEmpty(response.reportList) && !this.coreHelperService.isArrayEmpty(response.userJiraCount) && !this.coreHelperService.isNullOrUndefined(response)) {
        this.viewChart = true;
        this.reportData = response;
        this.generateYears();
        //this.currentYear = this.yearList[1].initialYear;
        this.initializeModuleTable(this.reportData.reportList);
        this.initializeProjectTable(this.reportData.reportList);
      }
      else {
        this.viewChart = false;
      }
    });


    // this.projectOptions = _.uniqBy(_.orderBy(this.projectOptions, ['projectName'], ['asc']), "projectId");
    // this.selectedProject = this.projectOptions.find(f => f.projectName === 'Brain Payroll');

    //this.projectOptionsData();
    //this.generateYears();

    // this.drawChart();

  }

  // createCalender() {
  //   for (let i = 1; i <= 53; i++) {
  //     const weekNoInString = 'Week No.' + i;
  //     let weekValue = '';
  //     if (i <= 39) {
  //       weekValue = moment((i + 13) + '-' + this.selectedYear, 'w-YYYY')
  //         .startOf('week').format('DD-MMM-YY') + ' - ' +
  //         moment((i + 13) + '-' + this.selectedYear, 'w-YYYY')
  //           .endOf('week').format('DD-MMM-YY');

  //     } else {
  //       weekValue = moment((i - 39) + '-' + (this.selectedYear + 1), 'w-YYYY')
  //         .startOf('week').format('DD-MMM-YY') + ' - ' +
  //         moment((i - 39) + '-' + (this.selectedYear + 1), 'w-YYYY')
  //           .endOf('week').format('DD-MMM-YY');
  //     }
  //     this.weekDetails.push({ 'weekNo': weekNoInString, 'weekDates': weekValue });
  //   }
  // }

  // private projectOptionsData() {
  //   this.reportservice.GetProjectIdName().subscribe(response => {
  //     return response;
  //   });
  // }

  //   getModuleDropDown = () => {
  //     this.moduleOpthow toions = new Array<IdNameModule>();
  //     this.moduleOptions.push(new IdNameModel({ moduleId: 0, moduleName: 'All Module' }));
  //     this.reportservice.getModuleIdNameByProjectId(this.selectedProject.projectId)
  //         .subscribe(result => {
  //             _.forEach(result, x => this.moduleOptions.push(new IdNameModel({ moduleId: x.moduleId, moduleName: x.moduleName })));
  //             this.selectedModule = this.moduleOptions.find(f => f.moduleName == "All Module");
  //         }).catch(result => { result.error([]); }); // service call  and module option variable set
  // }

  getModuleDropDown = () => {
    this.moduleOptions = new Array<IdNameModule>();
    this.moduleOptions.push(new IdNameModel({ moduleId: 0, moduleName: 'All Module' }));
    this.reportservice.getModuleIdNameByProjectId(this.projectForm.value.projectId)
      .subscribe(result => {
        result.forEach(x => this.moduleOptions.push(new IdNameModel({ moduleId: x.moduleId, moduleName: x.moduleName })));
        this.selectedModule = this.moduleOptions.find(f => f.moduleName === 'All Module');
      });
  }


  getProjectReport = () => {
    this.reportservice.getFirstLastActualPlanReport(this.selectedProject.projectId, this.selectedModule.moduleId, this.selectedYear).subscribe((data) => {
      if (!this.coreHelperService.isArrayEmpty(data.reportList) && !this.coreHelperService.isArrayEmpty(data.userJiraCount) && !this.coreHelperService.isNullOrUndefined(data)) {
        this.viewChart = true;
        this.initializeProjectTable(data.reportList);
        // let count = _.find(data.userJiraCount, x => x.projectId === projectId)
        let count = data.userJiraCount.find(x => x.projectId === this.selectedProject.projectId)
        this.employeeCount = count.logUserCount;
        this.jiraCount = count.issueCount;
        this.drawChart();
      } else {
        this.viewChart = false;
      }
    });
  }

  initializeProjectTable = (reportList: Array<PmsReport>) => {
    //reportList has objects individual, To bind data and iterate loop, we need to handle data.

    if (!this.coreHelperService.isArrayEmpty(reportList)) {
      this.projectList = new Array<Project>(); // initialize

      reportList.forEach(report => {
        let project = this.projectList.find(x => x.projectId === report.projectId);
        if (this.coreHelperService.isNullOrUndefined(project)) {
          this.projectList.push(new Project({
            projectId: report.projectId,
            projectName: report.projectName,
            year: report.year,
            componentId: report.componentId
          }))

          project = this.projectList.find((x) => { return x.projectId === report.projectId });

          if (this.coreHelperService.isNullOrUndefined(project)) return; // find and null check for project
          let week = project.weekList.find(week => week.week === report.week);
          if (this.coreHelperService.isNullOrUndefined(week)) return;  // find and null or undefined check
          week.firstPlanHours = this.reportservice.assignOrUpdate(report.firstPlanHours, week.firstPlanHours);
          week.lastPlanHours = this.reportservice.assignOrUpdate(report.lastPlanHours, week.lastPlanHours);
          week.actualLogHours = this.reportservice.assignOrUpdate(report.actualLogHours, week.actualLogHours);
          week.earningValuePercentage = this.reportservice.assignOrUpdate(report.earningValuePercentage, week.earningValuePercentage);
          week.burningValuePercentage = this.reportservice.assignOrUpdate(report.burningValuePercentage, week.burningValuePercentage);
        }
        else {
          const week = project.weekList.find(week => week.week === report.week);
          if (this.coreHelperService.isNullOrUndefined(week)) return;  // find and null or undefined check

          week.firstPlanHours = Math.round(this.reportservice.assignOrUpdate(report.firstPlanHours, week.firstPlanHours) * 100) / 100;
          week.lastPlanHours = Math.round(this.reportservice.assignOrUpdate(report.lastPlanHours, week.lastPlanHours) * 100) / 100;
          week.actualLogHours = Math.round(this.reportservice.assignOrUpdate(report.actualLogHours, week.actualLogHours) * 100) / 100;
          week.earningValuePercentage = this.reportservice.assignOrUpdate(report.earningValuePercentage, week.earningValuePercentage);
          week.burningValuePercentage = this.reportservice.assignOrUpdate(report.burningValuePercentage, week.burningValuePercentage);
        }
      })
    } else {
    }
  }


  initializeModuleTable = (modules: Array<PmsReport>) => {
    modules.forEach(module => {

      let component = this.moduleList.find(x => x.componentId === module.componentId);
      if (this.coreHelperService.isNullOrUndefined(component)) {
        this.moduleList.push(new Module({
          projectId: module.projectId,
          projectName: module.projectName,
          componentId: module.componentId,
          componentName: module.componentName,
          year: module.year
        }));


        let cmp = this.moduleList.find(x => x.componentId === module.componentId);
        let week = cmp.weekList.find(week => week.week === module.week);
        if (this.coreHelperService.isNullOrUndefined(week)) return;
        week.firstPlanHours = module.firstPlanHours;
        week.lastPlanHours = module.lastPlanHours;
        week.actualLogHours = module.actualLogHours;
        week.earningValuePercentage = module.earningValuePercentage;
        week.burningValuePercentage = module.burningValuePercentage;

      }
      else {
        var week = component.weekList.find(week => week.week === module.week);
        if (this.coreHelperService.isNullOrUndefined(week)) return;
        week.week = module.week;
        week.firstPlanHours = this.reportservice.assignOrUpdate(module.firstPlanHours, week.firstPlanHours);
        week.lastPlanHours = this.reportservice.assignOrUpdate(module.lastPlanHours, week.lastPlanHours);
        week.actualLogHours = this.reportservice.assignOrUpdate(module.actualLogHours, week.actualLogHours);
        week.earningValuePercentage = this.reportservice.assignOrUpdate(module.earningValuePercentage, week.earningValuePercentage);
        week.burningValuePercentage = this.reportservice.assignOrUpdate(module.burningValuePercentage, week.burningValuePercentage);
      }

    });
  }

  convertToWeekDate(weekNumber: number) {
    if (this.coreHelperService.isNullOrUndefined(this.selectedYear)) {
      this.selectedYear = 2018;
    }
    let newWeek;
    let newYear;
    if (weekNumber <= 39) {
      newWeek = weekNumber + 13;
      newYear = this.selectedYear;
    } else {
      newWeek = weekNumber - 39;
      newYear = this.selectedYear + 1;
    }

    return moment(newWeek + '-' + newYear, 'w-YYYY').startOf('week').format('DD-MMM') + ' - ' + moment(newWeek + '-' + newYear, 'w-YYYY')
      .endOf('week').format('DD-MMM');

  }

  generateYears() {
    // this.yearList.push({ initialYear : 2017, displayName: '2017'});
    // this.yearList.push({ initialYear : 2018, displayName: '2018'});
    // this.yearList.push({ initialYear : 2019, displayName: '2019'});


    let years = lodash.groupBy(this.reportData.reportList, (data) => {
      return data.year;
    });

    let yearsToAdd = Object.keys(years);
    lodash.each(yearsToAdd, (d: any) => {
      this.yearList.push({ displayName: d, initialYear: toInteger(d) });
    });

    // lodash.each(this.yearList, (d: any) => {
    //     if (d == "2018") {
    //         this.selectedYear = d;
    //     }
    // });
    let currentYearr = moment(this.selectedYear + '-' + '12-31').weeksInYear();
    this.weekNumberData = Array.from({ length: currentYearr }, (v, k) => k + 1).reverse();
  }



  drawChart = () => {
    if (this.selectedChart !== undefined && this.selectedChart !== null && this.selectedModule !== undefined) {
      Chart.defaults.global.defaultFontFamily = 'Times New Roman';
      Chart.defaults.global.defaultFontSize = 16;
      Chart.defaults.global.title.fontSize = 22;
      this.ctx = document.getElementById('myChart');
      let chartDataSet: Chart.ChartDataSets[] = [];
        this.selectedChart.data = [];
      this.weekList = [];

      let getModuleId = this.moduleOptions.find(x => x.moduleId === this.selectedModule.moduleId);
      if (this.selectedModule.moduleId === 0) {
        this.weekList = this.projectList[0].weekList;
      } else {
        this.weekList = this.moduleList.find(x => x.componentId === getModuleId.moduleId).weekList;
      }

      for (let index = 0; index < this.selectedChart.chartDataCallbacks.length; index++) {
        this.selectedChart.data.push(this.weekList.map(this.selectedChart.chartDataCallbacks[index]).reverse());
        chartDataSet.push({
          data: this.selectedChart.data[index],
          label: this.selectedChart.label[index],
          borderColor: this.selectedChart.borderColor[index],
          borderWidth: this.selectedChart.borderWidth,
          fill: this.selectedChart.fill,
          pointRadius: this.selectedChart.pointRadius,
          pointBackgroundColor: this.selectedChart.pointBackgroundColor
        });
      }
      const currentYearr = moment(this.selectedYear + '-' + '12-31').weeksInYear();
      this.selectedChart.yAxisDataPointLabel = Array.from({ length: currentYearr }, (v, k) => k + 1).reverse().map(String).reverse();

      if (this.myChart) {
        this.myChart.destroy();
      }
      // this.selectedChart.
      this.myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.selectedChart.yAxisDataPointLabel,
          datasets: chartDataSet
        },
        options: {
          title: {
            display: true,
            text: this.selectedChart.chartName,
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                fontStyle: 'Bold',
                fontSize: 20,
                display: true,
                labelString: this.selectedChart.xLabel
              }
            }],
            xAxes: [{
              scaleLabel: {
                fontStyle: 'Bold',
                fontSize: 20,
                display: true,
                labelString: this.selectedChart.yLabel
              }
            }]
          },
          legend: {
            display: true,
            position: 'right'

          }
        }
      });
    }

  }

}
