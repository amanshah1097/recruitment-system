import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { DailyStatusReportService } from './dailystatusreport.service';
import { DailyStatusReportRoutingModule } from './dailystatusreport-routing.module';
import { DailyStatusReportComponent } from './dailystatusreport.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { EditorComponent } from '../shared/editor/editor.component';
import { DailyStatusReportCreateComponent } from './dailystatusreport-create-edit.component/dailystatusreport-create.component';
import { DailyStatusReportEditComponent } from './dailystatusreport-create-edit.component/dailystatusreport-edit.component';


@NgModule({
    exports: [
        DailyStatusReportComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        DailyStatusReportRoutingModule,
        SharedModule,
        FormsModule,
        NgbDropdownModule,
        SharedModule,
    ],
    entryComponents: [
        DailyStatusReportComponent,
        DailyStatusReportCreateComponent,
        DailyStatusReportEditComponent
    ],
    declarations: [
        DailyStatusReportComponent,
        DailyStatusReportCreateComponent,
        DailyStatusReportEditComponent,
        EditorComponent
    ],
    providers: [
        DailyStatusReportService
    ],
})
export class DailyStatusReportModule { }

