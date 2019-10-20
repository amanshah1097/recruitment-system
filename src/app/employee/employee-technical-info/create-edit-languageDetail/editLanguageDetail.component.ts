
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { IdEntityValueServiceModel, RefDataForEmployeeTechnicalInfo, Language } from "../../employee.classes";
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
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
@Component({
    selector: 'app-createEducationDetail',
    templateUrl: 'create-edit-languageDetail.tmpl.html',
    styleUrls: ['../employee-technical-info.component.scss']
})

export class EditLanguageDetailComponent implements OnInit {
    @Input() languageDetail: Language;
    languageForm:FormGroup;
    // selectedLanguage = new IdEntityValueServiceModel();
    // selectedFluency = new IdEntityValueServiceModel();
    // selectedCompetency = new IdEntityValueServiceModel();
    employeeLanguageList = new Array<Language>()
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

    addLanguageDetail() {
        let data = this.languageForm.value;
        this.languageDetail.languageId = !this.coreHelperService.isNullOrUndefined(data.selectedLanguage) ? data.selectedLanguage.id : null;
        this.languageDetail.fluencyId = !this.coreHelperService.isNullOrUndefined(data.selectedFluency) ? data.selectedFluency.id : null;
        this.languageDetail.competencyId = !this.coreHelperService.isNullOrUndefined(data.selectedCompetency) ? data.selectedCompetency.id : null;
        this.languageDetail.languageName = !this.coreHelperService.isNullOrUndefined(data.selectedLanguage) ? data.selectedLanguage.entityValue : null;
        this.languageDetail.fluencyName = !this.coreHelperService.isNullOrUndefined(data.selectedFluency) ? data.selectedFluency.entityValue : null;
        this.languageDetail.competencyName = !this.coreHelperService.isNullOrUndefined(data.selectedCompetency) ? data.selectedCompetency.entityValue : null;
        this.activeModal.close();
        this._employeeService.addLanguage(this.languageDetail).subscribe(
            (data: Language) => {
              
            },
        ),
            error => {
                error => {
                    return observableThrowError(error);
                }
            }

    }
    ngOnInit() {
        this.languageForm = this.formBuilder.group({
            selectedFluency: !this.coreHelperService.isNullOrUndefined(this.languageDetail.fluencyId) ?_.filter(this.refDataForTechnicalInfo.fluency,data=>{
                return data.id == this.languageDetail.fluencyId
            }) : '',
            selectedCompetency:!this.coreHelperService.isNullOrUndefined(this.languageDetail.competencyId) ?_.filter(this.refDataForTechnicalInfo.competency,data=>{
                return data.id == this.languageDetail.competencyId
            }) : '',
            selectedLanguage:!this.coreHelperService.isNullOrUndefined(this.languageDetail.languageId) ?_.filter(this.refDataForTechnicalInfo.language,data=>{
                return data.id == this.languageDetail.languageId
            }) : '',
        })
    }
}