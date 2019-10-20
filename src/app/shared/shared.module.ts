import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { CustomizerComponent } from './customizer/customizer.component';
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        NgbModule,
        TranslateModule,
        QuillModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        TranslateModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective
    ]
})
export class SharedModule { }
