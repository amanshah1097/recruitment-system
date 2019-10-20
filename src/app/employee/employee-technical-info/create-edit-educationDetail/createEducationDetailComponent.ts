
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { WorkExperiance, IdEntityValueServiceModel, RefDataForEmployeeTechnicalInfo, Education } from "../../employee.classes";
import * as moment from 'moment';
import * as _ from 'lodash';
import { EmployeeService } from "../../employee.service";
import { CoreHelperService } from "../../../core/core-helper.service";
import { FormsModule } from '@angular/forms';
import { ReferenceDataManipulatorService } from '../../../referenceData/reference-data-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { error } from "selenium-webdriver";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
@Component({
    selector: 'app-createEducationDetail',
    templateUrl: 'create-edit-educationDetail.tmpl.html',
    styleUrls: ['../employee-technical-info.component.scss']
})

export class CreateEducationDetailComponent implements OnInit {
    educationForm: FormGroup;
    educationDetail = new Education();
    selectedDegree = new IdEntityValueServiceModel();
    employeeEducationList = new Array<Education>()
    refDataForTechnicalInfo = new RefDataForEmployeeTechnicalInfo();
    constructor(private _employeeService: EmployeeService,
        private coreHelperService: CoreHelperService,
        private refManipulatorService: ReferenceDataManipulatorService,
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,) {
        this.refManipulatorService.getReferenceDataForEntity(this.refDataForTechnicalInfo).then(res => {
            this.refDataForTechnicalInfo = res;
        });
    }

    addEducationDetail() {
        let data = this.educationForm.value;
        this.educationDetail.degreeName = !this.coreHelperService.isNullOrUndefined(data.selectedDegree) ? data.selectedDegree.entityValue : null;
        this.educationDetail.degreeId = !this.coreHelperService.isNullOrUndefined(data.selectedDegree) ? data.selectedDegree.id : null;
        this.educationDetail.employeeId = 11;
        this.educationDetail.startOn = data.startOn == null ? null : moment(data.startOn).toDate();
        this.educationDetail.endOn = data.endOn == null ? null : moment(data.endOn).toDate();
        this.educationDetail.institute = data.institute,
        this.educationDetail.score = data.score,
        this.educationDetail.specilization = data.specilization
        this._employeeService.addEducation(this.educationDetail).subscribe(
            (data: WorkExperiance) => {
                this.educationDetail.id = data.id;
                this.activeModal.close(this.educationDetail);
            },
            error => {
                return observableThrowError(error);
            }
        )
    }
    ngOnInit() {
        this.educationForm = this.formBuilder.group({
            selectedDegree:'',
            institute:'',
            specilization:'',
            score:'',
            startOn:'',
            endOn:'',
         })
    }
}