import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { EditorComponent } from '../shared/editor/editor.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { L1PanelService } from './l1panel.service';
import { L1PanelRoutingModule } from './l1panel-routing.module';
import { L1PanelComponent } from './l1panel.component';
import { L1PanelCreateComponent } from './l1panel-create-edit/l1panel-create.component';
import { L1PanelEditComponent } from './l1panel-create-edit/l1panel-edit.component';

@NgModule({
    exports: [
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        L1PanelRoutingModule,
        SharedModule,
        FormsModule,
        NgbDropdownModule,
        NgMultiSelectDropDownModule.forRoot(),
        SharedModule,
    ],
    entryComponents: [
        L1PanelComponent,
        L1PanelCreateComponent,
        L1PanelEditComponent,
    ],
    declarations: [
        L1PanelComponent,
        L1PanelCreateComponent,
        L1PanelEditComponent,
    ],
    providers: [
        L1PanelService
    ],
})
export class L1PanelModule { }

