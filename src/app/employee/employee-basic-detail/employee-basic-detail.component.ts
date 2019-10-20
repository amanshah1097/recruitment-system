import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core/src/metadata/directives';
import { EmployeeDetail, RefDataForEmployeeBasicDetail } from '../employee.classes';
import { ActivatedRoute } from '@angular/router';
import { ReferenceDataManipulatorService } from '../../referenceData/reference-data-helper.service';
import { EmployeeService } from '../employee.service';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CoreHelperService } from '../../core/core-helper.service';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-basic-detail',
  templateUrl: './employee-basic-detail.component.html',
  styleUrls: ['./employee-basic-detail.component.scss']
})
export class EmployeeBasicDetailComponent implements OnInit {
  employeeBasicDetail = new EmployeeDetail();
  dob: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  isEditMode: boolean = false;
  employeeBasicDetailForm: FormGroup;

  refDataForEmployeeBasicDetail = new RefDataForEmployeeBasicDetail();
  constructor(private _route: ActivatedRoute,
    private refManipulatorService: ReferenceDataManipulatorService,
    private _employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private coreHelperService: CoreHelperService) {
    this.refManipulatorService.getReferenceDataForEntity(this.refDataForEmployeeBasicDetail).then(res => {
      this.refDataForEmployeeBasicDetail = res;
    });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  enableSaveOnEdit = () => {
    this.isEditMode = true;
    this.employeeBasicDetailForm.enable();
  }
  updateBasicDetail = () => {
    let data = this.employeeBasicDetailForm.value;
    data.id = this.employeeBasicDetail.id;
    data.designationId = this.employeeBasicDetail.designationId;
    data.permanentAddressId = this.employeeBasicDetail.permanentAddressId;
    data.companyId = this.employeeBasicDetail.companyId;
    this.employeeBasicDetail = data;
    this.employeeBasicDetail.dateOfBirth = this.employeeBasicDetail.dateOfBirth == null ? null : moment(this.employeeBasicDetail.dateOfBirth).toDate();
    this.employeeBasicDetailForm.disable();
    this.isEditMode = false;
    this._employeeService.updateEmployeeDetail(this.employeeBasicDetail).subscribe(d => {

    })

  }
  ngOnInit() {
    // Get data from resolve and assign 
    this.employeeBasicDetail = this._route.snapshot.data.employeeData;

    let genderValue = !this.coreHelperService.isNullOrUndefined(this.employeeBasicDetail.genderId) ? _.filter(this.refDataForEmployeeBasicDetail.gender, data => {
      return data.id == this.employeeBasicDetail.genderId
    }) : '';
    let maritalStatusValue = !this.coreHelperService.isNullOrUndefined(this.employeeBasicDetail.maritalStatusId) ? _.filter(this.refDataForEmployeeBasicDetail.maritalStatus, data => {
      return data.id == this.employeeBasicDetail.maritalStatusId
    }) : '';
    this.employeeBasicDetailForm = this.formBuilder.group({
      firstName: this.employeeBasicDetail.firstName,
      lastName: this.employeeBasicDetail.lastName,
      genderId: this.employeeBasicDetail.genderId,
      maritalStatusId: this.employeeBasicDetail.maritalStatusId,
      dateOfBirth: this.coreHelperService.isNullOrUndefined(this.employeeBasicDetail.dateOfBirth) ? null : moment(this.employeeBasicDetail.dateOfBirth).toDate(),
      address1: this.employeeBasicDetail.address1,
      address2: this.employeeBasicDetail.address2,
      city: this.employeeBasicDetail.city,
      state: this.employeeBasicDetail.state,
      postCode: this.employeeBasicDetail.postCode,
      emailAddress: this.employeeBasicDetail.emailAddress,
      mobileNumber: this.employeeBasicDetail.mobileNumber,
    })

    this.employeeBasicDetailForm.disable();
  }

}
