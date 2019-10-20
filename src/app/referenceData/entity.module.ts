import { NgModule } from '@angular/core';
import { EntityService } from './entityService';
import { CoreModule } from '../core/core.module';
import { ReferenceDataManipulatorService } from './reference-data-helper.service';


@NgModule({

    imports: [
        CoreModule
    ],
    declarations: [
    ],
    providers: [
        EntityService,
        ReferenceDataManipulatorService,
    ],
})
export class EntityModule { }
