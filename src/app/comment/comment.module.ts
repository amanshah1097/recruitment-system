import { NgModule } from '@angular/core';
import { CommentRoutingModule } from './comment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { CommentService } from './comment.service';
import { EditorComponent } from '../shared/editor/editor.component';
import { CommentComponent } from './comment.component/comment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    exports: [
        CommentComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CoreModule,
        CommentRoutingModule,
        SharedModule
    ],
    entryComponents:[
        CommentComponent
    ],
    declarations: [
        CommentComponent,
        
    ],
    providers: [
        CommentService
    ],
})
export class CommentModule { }

