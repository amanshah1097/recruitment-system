import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { EditorComponent } from '../shared/editor/editor.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PanelService } from '../hrpanel/panel.service';
import { PanelRoutingModule } from '../hrpanel/panel-routing.module';
import { PanelComponent } from '../hrpanel/panel.component';
import { PanelCreateComponent } from '../hrpanel/panel-create-edit/panel-create.component';
import { PanelEditComponent } from '../hrpanel/panel-create-edit/panel-edit.component';

@NgModule({
    exports: [
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        PanelRoutingModule,
        SharedModule,
        FormsModule,
        NgbDropdownModule,
        NgMultiSelectDropDownModule.forRoot(),
        SharedModule,
    ],
    entryComponents: [
        PanelComponent,
        PanelCreateComponent,
        PanelEditComponent,
    ],
    declarations: [
        PanelComponent,
        PanelCreateComponent,
        PanelEditComponent,
    ],
    providers: [
        PanelService
    ],
})
export class HRPanelModule { }

