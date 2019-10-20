import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { EditorComponent } from '../shared/editor/editor.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PanelService } from './panel.service';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { PanelCreateComponent } from './panel-create-edit/panel-create.component';
import { PanelEditComponent } from './panel-create-edit/panel-edit.component';

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
export class L2PanelModule { }

