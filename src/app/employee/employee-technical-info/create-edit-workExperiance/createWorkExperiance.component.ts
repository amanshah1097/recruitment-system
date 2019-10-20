
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { WorkExperiance, IdEntityValueServiceModel, RefDataForEmployeeTechnicalInfo } from "../../employee.classes";
import * as moment from 'moment';
import * as _ from 'lodash';
import { EmployeeService } from "../../employee.service";
import { CoreHelperService } from "../../../core/core-helper.service";
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { error } from "selenium-webdriver";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ReferenceDataManipulatorService } from '../../../referenceData/reference-data-helper.service';
@Component({
    selector: 'app-createWorkExperiance',
    templateUrl: 'create-edit.workExperianceModel.tmpl.html',
    styleUrls: ['../employee-technical-info.component.scss']
})

export class CreateWorkExperianceComponent implements OnInit {
    workExperianceForm: FormGroup;
    workExperienceDetail = new WorkExperiance();
    refDataForTechnicalInfo = new RefDataForEmployeeTechnicalInfo();
    constructor(private _employeeService: EmployeeService,
        private coreHelperService: CoreHelperService,
        private refManipulatorService: ReferenceDataManipulatorService,
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder) {
        this.refManipulatorService.getReferenceDataForEntity(this.refDataForTechnicalInfo).then(res => {
            this.refDataForTechnicalInfo = res;
        });
    }

    addWorkExperiance() {
        let data = this.workExperianceForm.value;
        this.workExperienceDetail.employeeId = 11;
        this.workExperienceDetail.designationId = !this.coreHelperService.isNullOrUndefined(data.selectedDesignation) ? data.selectedDesignation.id : null;
        this.workExperienceDetail.designationName = !this.coreHelperService.isNullOrUndefined(data.selectedDesignation) ? data.selectedDesignation.entityValue : null;
        this.workExperienceDetail.companyName = data.companyName;
        this.workExperienceDetail.workStartOn = data.workStartOn == null ? null : moment(data.workStartOn).toDate();
        this.workExperienceDetail.workEndOn = data.workEndOn == null ? null : moment(data.workEndOn).toDate();

        this._employeeService.addWorkExperiance(this.workExperienceDetail).subscribe(
            (res: WorkExperiance) => {
                this.workExperienceDetail.id = res.id;
                this.activeModal.close(this.workExperienceDetail)
            },
            error => {
                return observableThrowError(error);
            }
        )
    }
    ngOnInit() {
        this.workExperianceForm = this.formBuilder.group({
           companyName : '',
           selectedDesignation:'',
           workStartOn:'',
           workEndOn:'',
        })
    }
}