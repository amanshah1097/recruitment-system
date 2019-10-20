import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { EditorComponent } from '../shared/editor/editor.component';
import { CandidateRegistrationService } from './candidate-registration.service';
import { CandidateRegistrationRoutingModule } from './candidate-registration-routing.module';
import { CandidateRegistrationComponent } from './candidate-registration.component';
import { CandidateRegistrationCreateComponent } from './candidate-registration-create-edit/candidate-registration-create.component';
import { CandidateRegistrationEditComponent } from './candidate-registration-create-edit/candidate-registration-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    exports: [
        // DailyStatusReportComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        CandidateRegistrationRoutingModule,
        SharedModule,
        FormsModule,
        NgbDropdownModule,
        NgMultiSelectDropDownModule.forRoot(),
        SharedModule,
    ],
    entryComponents: [
        CandidateRegistrationComponent,
        CandidateRegistrationCreateComponent,
        CandidateRegistrationEditComponent,
    ],
    declarations: [
        CandidateRegistrationComponent,
        CandidateRegistrationCreateComponent,
        CandidateRegistrationEditComponent,
    ],
    providers: [
        CandidateRegistrationService
    ],
})
export class CandidateRegistrationModule { }

