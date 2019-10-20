
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { IdEntityValueServiceModel, RefDataForEmployeeTechnicalInfo, Skills } from "../../employee.classes";
import * as moment from 'moment';
import * as _ from 'lodash';
import { EmployeeService } from "../../employee.service";
import { CoreHelperService } from "../../../core/core-helper.service";
import { FormsModule } from '@angular/forms';
import { ReferenceDataManipulatorService } from '../../../referenceData/reference-data-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { error } from "selenium-webdriver";
import { Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
@Component({
    selector: 'app-editSkillDetail',
    templateUrl: 'create-editSkillDetail.tmpl.html',
    styleUrls: ['../employee-technical-info.component.scss']
})

export class EditSkillDetailComponent implements OnInit {
    @Input() skillsDetail : Skills;
    skillForm: FormGroup;
    selectedSkill = new IdEntityValueServiceModel();
    employeeSkillList = new Array<Skills>()
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

    addSkillDetail() {
        let data = this.skillForm.value;
        this.skillsDetail.skillId = !this.coreHelperService.isNullOrUndefined(data.skill) ? data.skill.id : null;
        this.skillsDetail.skill = !this.coreHelperService.isNullOrUndefined(data.skill) ? data.skill.entityValue : null;
        this.skillsDetail.yearOfExperience = data.yearsOfExperiance
        this.activeModal.close(this.skillsDetail);
        this._employeeService.addSkills(this.skillsDetail).subscribe(
            (data: Skills) => {
               
            },
            error => {
                return observableThrowError(error);
            }
        )
    }
    ngOnInit() {
        this.skillForm = this.formBuilder.group({
            skill: !this.coreHelperService.isNullOrUndefined(this.skillsDetail.skillId) ?_.filter(this.refDataForTechnicalInfo.skills,data=>{
                return data.id == this.skillsDetail.skillId
            }) : this.refDataForTechnicalInfo.skills,
            yearsOfExperiance:!this.coreHelperService.isNullOrUndefined(this.skillsDetail.yearOfExperience) ? this.skillsDetail.yearOfExperience : null
        })
    }
}