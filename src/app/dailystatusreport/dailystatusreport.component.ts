import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import { DailyStatusReportService } from './dailystatusreport.service';
import { element } from 'protractor';
import { ITimesheetListController, IManageTimesheetController, IYearTimesheet, IClient, Employee, IProject, IModule, ITimesheetStateParams, IFilter, IFilterData, ITimesheet } from './dailystatusreport.interfaces'
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dsr, DsrTaxWeekMonthMappingData, DsrTaxYearModal, DsrFilterServiceModal } from './dailystatusreportclasses';
import { DailyStatusReportCreateComponent } from './dailystatusreport-create-edit.component/dailystatusreport-create.component';
import { DailyStatusReportEditComponent } from './dailystatusreport-create-edit.component/dailystatusreport-edit.component';
import { Array } from 'core-js/library/web/timers';
import { CoreHelperService } from '../core/core-helper.service';
import { CommonModule } from '@angular/common';  
import { IdNameModel } from '../core/core.classes';
import { filerdata } from '../shared/data/smart-data-table';
import { toInt } from 'ngx-bootstrap/chronos/utils/type-checks';


@Component({
  selector: 'app-dailystatusreport',
  templateUrl: './dailystatusreport.component.html',
  styleUrls: ['./dailystatusreport.component.scss']
})
export class DailyStatusReportComponent implements OnInit {
  selectedYear:number;
  taxYearForm:FormGroup;
  idnameTaxYear:Array<IdNameModel>=[];
  dsrTaxYearList:Array<DsrTaxYearModal>=[];
  listOfMonthNumbers: Array<number> = [];
  taxWeekMonthMappingList: DsrTaxWeekMonthMappingData[] = [];
  selectedTaxWeekMonthMapping = new DsrTaxWeekMonthMappingData();
  currentTaxWeek: number;
  currentMonth: number;
  currentTaxMonth: number;
  monthDisplayValue:string;
  hide = false;
  isReadOnly = false;
  parentform: FormGroup;
  message: string;
  // formResult: { comment: string, dsrdate: string };
  validMessage: string = "";
  dsrTitle: string = '';
  private timesheetArray: ITimesheet[];
  private yearArray: IYearTimesheet[];
  yearList: IYearTimesheet[] = [];
  dsrListData:Array<Dsr>=[];
  isWeekFilter: boolean =true;
  isMonthFilter: boolean=false;
  dsrData: Dsr;
  dsrTaxWeekValue: string;
  // filterList: IFilter[] = [{ filterId: 1, filterName: 'Project' },
  // { filterId: 2, filterName: 'Employee' }];

  constructor(private dsrservice: DailyStatusReportService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private coreHelperService: CoreHelperService
  ) {


    this.listOfMonthNumbers = this.coreHelperService.getListOfMonths();
   
  }
  deleteComment(dsrId: number) {
    this.dsrservice.deleteComment(dsrId).subscribe(t => {
     this.dsrListData =  _.reject(this.dsrListData,(data:Dsr)=>{
          return data.id == dsrId;
     });
    });
  }
  onYearChange=()=>{
    this.selectedYear = this.taxYearForm.value.selectedYear;
    this.dsrservice.getTaxWeekMonthMappingData(this.selectedYear).subscribe((data: Array<DsrTaxWeekMonthMappingData>) => {
      this.taxWeekMonthMappingList = [];
      this.taxWeekMonthMappingList.push(...data);
      this.setTaxWeekAndDate(this.isWeekFilter)
    });

  }
  addDsr(content) {
    let today = new Date();
    this.parentform = this.formBuilder.group({
      comment: '',
      dsrdate: new NgbDate(today.getFullYear(), today.getMonth(), today.getDate())
    });
    const modalRef = this.modalService.open(DailyStatusReportCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((data:Array<Dsr>) => {
      if(!this.coreHelperService.isArrayEmpty(data))
      {
        if(this.isWeekFilter)
        {
           this.getDsrListData(this.currentTaxWeek,true)
        } 
        else
        {
         this.getDsrListData(this.currentTaxMonth,false)
        }
     
      }
    }).catch(() => {
     });
  }

  editDsr(content, dsrId: number) {
    this.dsrservice.getDsrById(dsrId).subscribe(t => {
      const modalRef = this.modalService.open(DailyStatusReportEditComponent, { size: 'lg', backdrop: 'static', keyboard: false });
      (<DailyStatusReportEditComponent>modalRef.componentInstance).dsrData = t;
      modalRef.result.then((editedData:Dsr) => {
       _.filter(this.dsrListData,(data:Dsr)=>{
          if(data.id == editedData.id)
          {
              data.id = editedData.id,
              data.approvedBy = editedData.approvedBy,
              data.dsrDetails = editedData.dsrDetails,
              data.employeeId = editedData.employeeId,
              data.isApproved = editedData.isApproved
          }
       })
      }).catch(() => { });;
    });
  }

  filterOption(filterFlag: string) {
    debugger;
    if (filterFlag === 'week') {
      this.isMonthFilter =false
      this.isWeekFilter = true;
      this.setTaxWeekAndDate(this.isWeekFilter);
    } else if (filterFlag === 'month') {
      this.isWeekFilter = false;
      this.isMonthFilter = true;
      this.setTaxWeekAndDate(this.isWeekFilter);
    }
  }

  filterTimeMinus() {
    if (this.isWeekFilter === true) {
      this.filterTimeMinusWeek();
    }
    else {
      this.filterTimeMinusMonth();
    }
  }

  filterTimeMinusWeek() {
    if (this.selectedTaxWeekMonthMapping.weekNumber == 1) {
      return;
    }
    this.currentTaxWeek = this.selectedTaxWeekMonthMapping.weekNumber - 1;
    this.selectedTaxWeekMonthMapping = _.find(this.taxWeekMonthMappingList, (pre: DsrTaxWeekMonthMappingData) => {
      return pre.weekNumber == this.currentTaxWeek
    });
    this.dsrTaxWeekValue = moment(this.selectedTaxWeekMonthMapping.startDate).format("DD-MMM-YY") + " - " + moment(this.selectedTaxWeekMonthMapping.endDate).format("DD-MMM-YY")
    let data = new DsrFilterServiceModal();
    this.getDsrListData(this.currentTaxWeek,true);
  }
  
  filterTimeMinusMonth() {
    if(this.currentMonth == 1)
    {
      return
    }
    else
    {
      this.currentMonth = this.currentMonth - 1;  
      this.getDsrListData(this.currentMonth,this.isWeekFilter);    
    }
    
  }

  filterTimePlus() {
    if (this.isWeekFilter === true) {
      this.filterTimePlusWeek();
    }
    else {
      this.filterTimePlusMonth();
    }
  }

  filterTimePlusWeek() {
    if (this.selectedTaxWeekMonthMapping.weekNumber == 53) {
      return;
    }
    this.currentTaxWeek = this.selectedTaxWeekMonthMapping.weekNumber + 1;
    this.selectedTaxWeekMonthMapping = _.find(this.taxWeekMonthMappingList, (pre: DsrTaxWeekMonthMappingData) => {
      return pre.weekNumber == this.currentTaxWeek
    });
    this.dsrTaxWeekValue = moment(this.selectedTaxWeekMonthMapping.startDate).format("DD-MMM-YY") + " - " + moment(this.selectedTaxWeekMonthMapping.endDate).format("DD-MMM-YY")
    this.getDsrListData(this.currentTaxWeek,true);
   
  }

  filterTimePlusMonth() {
    if(this.currentMonth == 12)
    {
        return      
    }
    else
    {
      this.currentMonth = this.currentMonth + 1;   
      this.getDsrListData(this.currentMonth,this.isWeekFilter);   
    }
    
  }
  // setMonthDisplayValue=()=>{
    
  //   let month = this.currentTaxMonth.toString();
  //   if(toInt(month) < 10)
  //   {
  //     month = '0' + month; 
  //   }
  //   this.monthDisplayValue = moment(month, 'MM').format('MMMM');
  // }

  getDsrListData(weekOrMonth:number,isWeek:boolean)
  {
    let filterData = new DsrFilterServiceModal();
    filterData.year = this.taxYearForm.value.selectedYear;
    if(isWeek)
    {
      filterData.week = weekOrMonth;
      filterData.isWeekFilter = true;
    }
    else
    {
      filterData.month = weekOrMonth;
      filterData.isWeekFilter = false;
    }
    this.dsrservice.getDsrList(filterData).subscribe((data:Array<Dsr>)=>{
      this.dsrListData = [];
      this.dsrListData.push(...data)
    });
  }
  setTaxWeekAndDate = (filterFlag:boolean) => {
    debugger;
    if (filterFlag) {
      if(this.coreHelperService.isNullOrUndefined(this.currentTaxWeek))
      {
          this.currentTaxWeek = 1;
      }
      this.selectedTaxWeekMonthMapping = _.find(this.taxWeekMonthMappingList, (pre: DsrTaxWeekMonthMappingData) => {
        return pre.weekNumber == this.currentTaxWeek;
      });
      this.currentTaxWeek = this.selectedTaxWeekMonthMapping.weekNumber;
      this.dsrTaxWeekValue = moment(this.selectedTaxWeekMonthMapping.startDate).format("DD-MMM-YY") + " - " + moment(this.selectedTaxWeekMonthMapping.endDate).format("DD-MMM-YY")
     
      this.getDsrListData(this.currentTaxWeek,this.isWeekFilter);
    }
    else {
      this.currentTaxMonth = this.coreHelperService.getCurrentMonth();
      this.currentMonth = this.currentTaxMonth + 9;
      if(this.currentMonth > 12) {
        this.currentMonth = 1;
      }
      this.getDsrListData(this.currentMonth,this.isWeekFilter);
    }

  } 
  
  ngOnInit() {
    this.taxYearForm = this.formBuilder.group({
      selectedYear:(new Date().getFullYear()) - 1
  })
    this.idnameTaxYear = this.coreHelperService.getTaxYearsInIdName();
    _.each(this.idnameTaxYear,(data:IdNameModel)=>{
          this.dsrTaxYearList.push({
            id:data.id,
            name:data.name,
            displayValue: (data.id) + "-" + (data.id + 1)
          });
    });
    this.dsrservice.getCurrentTaxWeekNumber().subscribe((data:any)=>{
      if(data != null)
      {
      this.currentTaxWeek = data.currentTaxWeekNumber;
      this.selectedYear = data.currentTaxYear;
      this.taxYearForm.value.selectedYear  = this.selectedYear;
      this.dsrservice.getTaxWeekMonthMappingData(this.selectedYear).subscribe((data: Array<DsrTaxWeekMonthMappingData>) => {
        this.taxWeekMonthMappingList.push(...data);
        this.setTaxWeekAndDate(this.isWeekFilter)
      });
      }
    });
  }
}

