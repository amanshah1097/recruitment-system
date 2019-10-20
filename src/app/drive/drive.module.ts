import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { EditorComponent } from '../shared/editor/editor.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DriveService } from './drive.service';
import { DriveRoutingModule } from './drive-routing.module';
import { DriveComponent } from './drive.component';
import { DriveCreateComponent } from './drive-create-edit/drive-create.component';
import { DriveEditComponent } from './drive-create-edit/drive-edit.component';

@NgModule({
    exports: [
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        DriveRoutingModule,
        SharedModule,
        FormsModule,
        NgbDropdownModule,
        NgMultiSelectDropDownModule.forRoot(),
        SharedModule,
    ],
    entryComponents: [
        DriveComponent,
        DriveCreateComponent,
        DriveEditComponent,
    ],
    declarations: [
        DriveComponent,
        DriveCreateComponent,
        DriveEditComponent,
    ],
    providers: [
        DriveService
    ],
})
export class DriveModule { }

