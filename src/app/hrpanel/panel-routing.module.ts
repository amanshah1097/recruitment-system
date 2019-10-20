import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from '../hrpanel/panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    data: {
      title: 'Panel'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PanelRoutingModule { }
