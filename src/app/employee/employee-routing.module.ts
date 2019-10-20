import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeBasicDetailComponent } from './employee-basic-detail/employee-basic-detail.component';
import { EmployeeTechnicalInfoComponent } from './employee-technical-info/employee-technical-info.component';
import { EmployeeDocumentComponent } from './employee-document/employee-document.component';
import { EmployeeTeamComponent } from './employee-team/employee-team.component';
import { EmployeeCommentComponent } from './employee-comment/employee-comment.component';
import { employeeResolverInterface} from './employeeResolverInterface';
import { employeeListResolverInterface} from './employeeResolverInterface';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeProfileDetailComponent } from './employee-profile-detail/employeeProfileDetail.component';
import { resolve } from 'url';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    data: {
      title: 'Employee'
    },
    children: [

      {
        path: '',
        component: EmployeeProfileDetailComponent,
        children : [
          {
            path: '',
            component: EmployeeBasicDetailComponent,
            resolve: { employeeData: employeeResolverInterface }
          },
          {
            path: 'basicDetail',
            component: EmployeeBasicDetailComponent,
            resolve: { employeeData: employeeResolverInterface }
          },
          {
            path: 'technicalInfo',
            component: EmployeeTechnicalInfoComponent
          },
          {
            path: 'document',
            component: EmployeeDocumentComponent
          },
          {
            path: 'team',
            component: EmployeeTeamComponent
          },
          {
            path: 'comment',
            component: EmployeeCommentComponent
          },

        ]
      },
     
      {
        path: 'employeeList',
        component: EmployeeListComponent,
        resolve: { employeeListData: employeeListResolverInterface }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule {
  constructor() { }
}
