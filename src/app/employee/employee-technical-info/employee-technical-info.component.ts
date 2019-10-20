import { Component, OnInit, SkipSelf } from '@angular/core';
import { ChartType, ChartEvent } from "ng-chartist";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { WorkExperiance, Language, Skills, Education, RefDataForEmployeeTechnicalInfo, IdEntityValueServiceModel } from '../employee.classes';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Object } from 'core-js/library/web/timers';
import { CoreHelperService } from '../../core/core-helper.service';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { Input } from '@angular/core';
import { CreateWorkExperianceComponent } from './create-edit-workExperiance/createWorkExperiance.component';
import { ActivatedRoute } from '@angular/router';
import { EditWorkExperianceComponent } from './create-edit-workExperiance/editWorkExperianceComponent';
import { CreateEducationDetailComponent } from './create-edit-educationDetail/createEducationDetailComponent';
import { EditEducationDetailComponent } from './create-edit-educationDetail/editEducationDetailComponent';
import { CreateSkillDetailComponent } from './create-edit-skillDetail/createSkillDetail.component';
import { EditSkillDetailComponent } from './create-edit-skillDetail/editSkillDetail.component';
import { CreateLanguageDetailComponent } from './create-edit-languageDetail/createLanguageDetail.component';
import { EditLanguageDetailComponent } from './create-edit-languageDetail/editLanguageDetail.component';
import { ReferenceDataManipulatorService } from '../../referenceData/reference-data-helper.service';

@Component({
  selector: 'app-employee-technical-info',
  templateUrl: './employee-technical-info.component.html',
  styleUrls: ['./employee-technical-info.component.scss']
})

export class EmployeeTechnicalInfoComponent implements OnInit {
  closeResult: string;
  model: Date;
  workExperienceDetail = new WorkExperiance();
  languageDetail = new Language();
  skillsDetail = new Skills();
  educationDetail = new Education();
  employeeWorkExperianceList = new Array<WorkExperiance>()
  employeeLanguageList = new Array<Language>()
  employeeSkillList = new Array<SkipSelf>()
  employeeEducationList = new Array<Education>()
  refDataForTechnicalInfo = new RefDataForEmployeeTechnicalInfo();
  selectedDegree = new IdEntityValueServiceModel();

  selectedSkill = new IdEntityValueServiceModel();
  selectedDesignation = new IdEntityValueServiceModel();

  constructor(private modalService: NgbModal,
    private _employeeService: EmployeeService,
    private refManipulatorService: ReferenceDataManipulatorService,
    private coreHelperService: CoreHelperService,
    private route: ActivatedRoute,
  ) {

    this.refManipulatorService.getReferenceDataForEntity(this.refDataForTechnicalInfo).then(res => {
      this.refDataForTechnicalInfo = res;
    });
    this._employeeService.getAllEmployeeTechnicalInformation().subscribe(
      (data: any) => {
        if (data != null) {
          this.employeeWorkExperianceList.push(...data.workExperianceList);
          this.employeeEducationList.push(...data.educationList);
          this.employeeSkillList.push(...data.skillsList);
          this.employeeLanguageList.push(...data.languageList);
        }
      },
    )
  }

  addWorkExperiance() {
    const modalRef = this.modalService.open(CreateWorkExperianceComponent, { size: 'lg' }, ).result.then((result) => {
      this.employeeWorkExperianceList.push(result)
    }, (reason) => {
    });;
  }
  editWorkExperiance = (data) => {
    const modalRef = this.modalService.open(EditWorkExperianceComponent, { size: 'lg' }, );
    (<EditWorkExperianceComponent>modalRef.componentInstance).workExperienceDetail = data;
  }
  addEducationDetail = () => {
    const modalRef = this.modalService.open(CreateEducationDetailComponent, { size: 'lg' }, ).result.then((result) => {
      this.employeeEducationList.push(result)
    }, (reason) => {
    });;
  }
  editEducationDetail = (data) => {
    const modalRef = this.modalService.open(EditEducationDetailComponent, { size: 'lg' }, );
    (<EditEducationDetailComponent>modalRef.componentInstance).educationDetail = data;

  }
  addSkillsDetail = () => {
    const modalRef = this.modalService.open(CreateSkillDetailComponent, { size: 'lg' }, ).result.then((result) => {
      this.employeeSkillList.push(result)
    }, (reason) => {
    });;
  }
  editSkillDetail = (data) => {
    const modalRef = this.modalService.open(EditSkillDetailComponent, { size: 'lg' }, );
    (<EditSkillDetailComponent>modalRef.componentInstance).skillsDetail = data;
  }
  addLanguageDetail = () => {
    const modalRef = this.modalService.open(CreateLanguageDetailComponent, { size: 'lg' }, ).result.then((result) => {
      this.employeeLanguageList.push(result)
    }, (reason) => {
    });;
  }
  editLanguageDetail = (data) => {
    const modalRef = this.modalService.open(EditLanguageDetailComponent, { size: 'lg' }, );

    (<EditLanguageDetailComponent>modalRef.componentInstance).languageDetail = data;
  }
  deleteWorkExperianceById = (id) => {
    this._employeeService.deleteWorkExperianceById(id).subscribe(res => {
      this.employeeWorkExperianceList = _.reject(this.employeeWorkExperianceList, (data:WorkExperiance) => {
        return data.id == id;
      })
    });
  }
  deleteEducationRecordById = (id) => {
    this._employeeService.deleteEducationDetailById(id).subscribe(res => {
      this.employeeEducationList = _.reject(this.employeeEducationList, (data:Education) => {
        return data.id == id;
      })
    });
  }
  deleteLanguageRecordById = (id) => {
    this._employeeService.deleteLanguageDetailById(id).subscribe(res => {
      this.employeeLanguageList = _.reject(this.employeeLanguageList, (data:Language) => {
        return data.id == id;
      })
    });
  }
  deleteSkillRecordById = (id) => {
    this._employeeService.deleteSkillDetailById(id).subscribe(res => {
      this.employeeSkillList = _.reject(this.employeeSkillList, (data:Skills) => {
        return data.id == id;
      })
    });
  }


  ngOnInit() {

  }



}
