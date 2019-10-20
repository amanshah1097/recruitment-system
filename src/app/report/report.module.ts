import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

import { QuillModule } from 'ngx-quill';
//import { EditorComponent } from 'app/shared/editor/editor.component';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component/report.component';
import { ReportService } from './report.service';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    exports: [
        ReportComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        ReportRoutingModule,
        QuillModule,
        CommonModule,
        ChartsModule,
        ChartistModule,
        NgxChartsModule,
        HttpClientModule,
    ],
    entryComponents: [
        ReportComponent
    ],
    declarations: [
        ReportComponent,
      //  EditorComponent
    ],
    providers: [
        ReportService
    ],
})
export class ReportModule { }

