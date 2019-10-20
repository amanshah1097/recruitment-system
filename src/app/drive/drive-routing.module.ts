import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriveComponent } from './drive.component';

const routes: Routes = [
  {
    path: '',
    component: DriveComponent,
    data: {
      title: 'Drive'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DriveRoutingModule { }
