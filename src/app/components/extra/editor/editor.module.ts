import { NgModule } from '@angular/core';
import { EditorService } from './editor.service';
import { EditorComponent } from './editor.component';

@NgModule({
    exports: [],
    imports: [],
    declarations: [
        EditorComponent,
    ],
    providers: [
        EditorService,
    ]
})
export class EditorModule { }
