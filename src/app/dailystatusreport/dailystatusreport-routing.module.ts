import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyStatusReportComponent } from './dailystatusreport.component';

const routes: Routes = [
  {
    path: '',
    component: DailyStatusReportComponent,
    data: {
      title: 'Daily Status Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DailyStatusReportRoutingModule { }
