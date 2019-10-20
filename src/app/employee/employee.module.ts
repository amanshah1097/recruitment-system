import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
// import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmployeeService } from './employee.service';
import { CoreModule } from '../core/core.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeBasicDetailComponent } from './employee-basic-detail/employee-basic-detail.component';
import { EmployeeCommentComponent } from './employee-comment/employee-comment.component';
import { EmployeeDocumentComponent } from './employee-document/employee-document.component';
import { EmployeeProfileDetailComponent } from './employee-profile-detail/employeeProfileDetail.component';
import { EmployeeTeamComponent } from './employee-team/employee-team.component';
import { CreateEducationDetailComponent } from './employee-technical-info/create-edit-educationDetail/createEducationDetailComponent';
import { EditEducationDetailComponent } from './employee-technical-info/create-edit-educationDetail/editEducationDetailComponent';
import { CreateLanguageDetailComponent } from './employee-technical-info/create-edit-languageDetail/createLanguageDetail.component';
import { EditLanguageDetailComponent } from './employee-technical-info/create-edit-languageDetail/editLanguageDetail.component';
import { CreateSkillDetailComponent } from './employee-technical-info/create-edit-skillDetail/createSkillDetail.component';
import { EditSkillDetailComponent } from './employee-technical-info/create-edit-skillDetail/editSkillDetail.component';
import { CreateWorkExperianceComponent } from './employee-technical-info/create-edit-workExperiance/createWorkExperiance.component';
import { EditWorkExperianceComponent } from './employee-technical-info/create-edit-workExperiance/editWorkExperianceComponent';
import { EmployeeTechnicalInfoComponent } from './employee-technical-info/employee-technical-info.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { employeeResolverInterface, employeeListResolverInterface } from './employeeResolverInterface';
import { CoreLocalStorageService } from '../core/core-storage/core-local-storage.service';
import { ReferenceDataManipulatorService } from '../referenceData/reference-data-helper.service';

@NgModule({

    imports: [
        // CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule,
        EmployeeRoutingModule,
        SharedModule,
        BsDatepickerModule.forRoot()
        
    ],
    entryComponents: [
        EmployeeComponent,
        EmployeeBasicDetailComponent,
        EmployeeCommentComponent,
        EmployeeDocumentComponent,
        EmployeeListComponent,
        EmployeeProfileDetailComponent,
        EmployeeTeamComponent,
        CreateEducationDetailComponent,
        EditEducationDetailComponent,
        CreateLanguageDetailComponent,
        EditLanguageDetailComponent,
        CreateSkillDetailComponent,
        EditSkillDetailComponent,
        CreateWorkExperianceComponent,
        EditWorkExperianceComponent,
        EmployeeTechnicalInfoComponent
    ],
    declarations: [
        EmployeeComponent,
        EmployeeBasicDetailComponent,
        EmployeeCommentComponent,
        EmployeeDocumentComponent,
        EmployeeListComponent,
        EmployeeProfileDetailComponent,
        EmployeeTeamComponent,
        CreateEducationDetailComponent,
        EditEducationDetailComponent,
        CreateLanguageDetailComponent,
        EditLanguageDetailComponent,
        CreateSkillDetailComponent,
        EditSkillDetailComponent,
        CreateWorkExperianceComponent,
        EditWorkExperianceComponent,
        EmployeeTechnicalInfoComponent
    ],
    providers: [
        EmployeeService,
        employeeResolverInterface,
        ReferenceDataManipulatorService,
        employeeListResolverInterface
    ]
})
export class EmployeeModule { }
