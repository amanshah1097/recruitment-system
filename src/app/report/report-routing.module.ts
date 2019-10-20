import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component/report.component';


const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {
      title: 'Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ReportRoutingModule { }
