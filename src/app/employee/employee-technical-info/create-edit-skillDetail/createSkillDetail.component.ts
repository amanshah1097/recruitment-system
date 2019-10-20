
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { WorkExperiance, IdEntityValueServiceModel, RefDataForEmployeeTechnicalInfo, Education, Skills } from "../../employee.classes";
import * as moment from 'moment';
import * as _ from 'lodash';
import { EmployeeService } from "../../employee.service";
import { CoreHelperService } from "../../../core/core-helper.service";
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { error } from "selenium-webdriver";
import { Object } from "core-js/library/web/timers";
import { ReferenceDataManipulatorService } from '../../../referenceData/reference-data-helper.service';
@Component({
    selector: 'app-createSkillDetail',
    templateUrl: 'create-editSkillDetail.tmpl.html',
    styleUrls: ['../employee-technical-info.component.scss']
})

export class CreateSkillDetailComponent implements OnInit {
    skillsDetail = new Skills();
    selectedSkill = new IdEntityValueServiceModel();
    employeeSkillList = new Array<Skills>()
    skillForm: FormGroup;
    refDataForTechnicalInfo = new RefDataForEmployeeTechnicalInfo();
    constructor(private _employeeService: EmployeeService,
        private coreHelperService: CoreHelperService,
        private refManipulatorService: ReferenceDataManipulatorService,
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder, ) {
        this.refManipulatorService.getReferenceDataForEntity(this.refDataForTechnicalInfo).then(res => {
            this.refDataForTechnicalInfo = res;
        });
    }

    addSkillDetail() {
        let data = this.skillForm.value;
         this.skillsDetail.skillId = !this.coreHelperService.isNullOrUndefined(data.skill) ? data.skill.id : null;
        this.skillsDetail.skill = !this.coreHelperService.isNullOrUndefined(data.skill) ? data.skill.entityValue : null;
        this.skillsDetail.yearOfExperience = data.yearsOfExperiance
        this._employeeService.addSkills(this.skillsDetail).subscribe(
            (data: Skills) => {
                this.skillsDetail.id = data.id;
                this.activeModal.close(this.skillsDetail);
            },
            error => {
                return observableThrowError(error);
            }
        )
    }
    ngOnInit() {
        this.skillForm = this.formBuilder.group({
            skill:this.refDataForTechnicalInfo.skills,
            yearsOfExperiance:'',
        })
    }
}