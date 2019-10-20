import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { L1Panel } from '../l1panel.classes';
import { L1PanelService } from '../l1panel.service';

@Component({
    selector: 'app-l1panel-create',
    templateUrl: './l1panel-create-edit.tmpl.component.html',
    styleUrls: ['../l1panel.component.scss',]
})
export class L1PanelCreateComponent implements OnInit {

    parentform: FormGroup;
    l1paneltitle: string = '';
    l1panelDetails: L1Panel;

    //   @Input() dsrData: Dsr;
    constructor(
        private l1panelservice: L1PanelService,
        private formBuilder: FormBuilder,
        private activeModal: NgbActiveModal,
    ) {

    }

    ngOnInit() {
        let today = new Date();
        this.l1paneltitle = 'Add L1 Panel Review';
        this.parentform = this.formBuilder.group({
            panelName: '',
            // driveDate: new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
        });
    }
    onPost() {
        console.log(this.parentform.value);

        this.l1panelDetails = this.parentform.value;
        // let driveDate: NgbDate = this.parentform.value.driveDate;
        // this.driveDetails.driveDate = moment(`${driveDate.year}-${driveDate.month}-${driveDate.day}`, "YYYY-MM-DD").format();
        if (this.parentform.valid) {
            // this.validMessage = "Your comment has been posted.";
            this.l1panelservice.postL1PanelDetails(this.l1panelDetails).subscribe(
                data => {
                    this.activeModal.close(data);
                }
            );
        }
    }
}
