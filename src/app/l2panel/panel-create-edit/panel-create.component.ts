import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Panel } from '../panel.classes';
import { PanelService } from '../panel.service';

@Component({
    selector: 'app-panel-create',
    templateUrl: './panel-create-edit.tmpl.component.html',
    styleUrls: ['../panel.component.scss',]
})
export class PanelCreateComponent implements OnInit {

    parentform: FormGroup;
    paneltitle: string = '';
    panelDetails: Panel;

    //   @Input() dsrData: Dsr;
    constructor(
        private panelservice: PanelService,
        private formBuilder: FormBuilder,
        private activeModal: NgbActiveModal,
    ) {

    }

    ngOnInit() {
        let today = new Date();
        this.paneltitle = 'Add Panel';
        this.parentform = this.formBuilder.group({
            panelName: '',
            // driveDate: new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
        });
    }
    onPost() {
        console.log(this.parentform.value);

        this.panelDetails = this.parentform.value;
        // let driveDate: NgbDate = this.parentform.value.driveDate;
        // this.driveDetails.driveDate = moment(`${driveDate.year}-${driveDate.month}-${driveDate.day}`, "YYYY-MM-DD").format();
        if (this.parentform.valid) {
            // this.validMessage = "Your comment has been posted.";
            this.panelservice.postPanelDetails(this.panelDetails).subscribe(
                data => {
                    this.activeModal.close(data);
                }
            );
        }
    }
}
