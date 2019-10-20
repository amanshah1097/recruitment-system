
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload.component/upload.component';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    data: {
      title: 'Upload'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UploadRoutingModule { }
