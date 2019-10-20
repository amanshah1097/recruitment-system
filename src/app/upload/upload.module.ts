import { NgModule } from '@angular/core';
import { UploadRoutingModule } from './upload-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { UploadService } from './upload.service';
import { QuillModule } from 'ngx-quill';
import { UploadComponent } from './upload.component/upload.component';
import { CommonModule } from "@angular/common"
import { FileUploadModule } from "ng2-file-upload";
import { FormsModule } from '@angular/forms';


@NgModule({
    exports: [
        UploadComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        UploadRoutingModule,
        CommonModule,
        FileUploadModule,
        FormsModule,
        QuillModule
    ],
    entryComponents:[
        UploadComponent
    ],
    declarations: [
        UploadComponent,
    ],
    providers: [
        UploadService
    ],
})
export class UploadModule { }

