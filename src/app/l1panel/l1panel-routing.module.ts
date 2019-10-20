import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { L1PanelComponent } from './l1panel.component';

const routes: Routes = [
  {
    path: '',
    component: L1PanelComponent,
    data: {
      title: 'Panel'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class L1PanelRoutingModule { }
