import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateRegistrationComponent } from './candidate-registration.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateRegistrationComponent,
    data: {
      title: 'Candidate Registration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CandidateRegistrationRoutingModule { }
