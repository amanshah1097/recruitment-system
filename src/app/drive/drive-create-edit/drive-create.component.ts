import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { DriveComponent } from '../drive.component';
import { DriveService } from '../drive.service';
import { Drive } from '../drive.classes';

@Component({
    selector: 'app-drive-create',
    templateUrl: './drive-create-edit.tmpl.component.html',
    styleUrls: ['../drive.component.scss',]
})
export class DriveCreateComponent implements OnInit {

    parentform: FormGroup;
    drivetitle: string = '';
    dropdownList = [];
    dropdownSettings = {};
    driveDetails: Drive;

    //   @Input() dsrData: Dsr;
    constructor(
        private driveservice: DriveService,
        private formBuilder: FormBuilder,
        private activeModal: NgbActiveModal,
    ) {

    }

    ngOnInit() {
        let today = new Date();
        this.drivetitle = 'Add Drive';
        this.parentform = this.formBuilder.group({
            driveName: '',
            driveDate: new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate()),
            technology: '',
            employeeId: null,
            panelName: '',
            panelId: '',
        });
    }
    onPost() {
        console.log(this.parentform.value);

        this.driveDetails = this.parentform.value;
        let driveDate: NgbDate = this.parentform.value.driveDate;
        this.driveDetails.driveDate = moment(`${driveDate.year}-${driveDate.month}-${driveDate.day}`, "YYYY-MM-DD").format();
        if (this.parentform.valid) {
            // this.validMessage = "Your comment has been posted.";
            this.driveservice.postDriveDetails(this.driveDetails).subscribe(
                data => {
                    this.activeModal.close(data);
                }
            );
        }
    }
}
