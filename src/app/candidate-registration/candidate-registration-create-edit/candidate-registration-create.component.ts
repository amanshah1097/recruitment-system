import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { CandidateRegistrationComponent } from '../candidate-registration.component';
import { CandidateRegistrationService } from '../candidate-registration.service';

@Component({
    selector: 'app-candidate-registration-create',
    templateUrl: './candidate-registration-create-edit.tmpl.component.html',
    styleUrls: ['../candidate-registration.component.scss',]
})
export class CandidateRegistrationCreateComponent implements OnInit {

    parentform: FormGroup;
    candidatetitle: string = '';
    dropdownList = [];
    dropdownSettings = {};
    candidateDetails: any;
    //   @Input() dsrData: Dsr;
    constructor(
        private candidateregistrationservice: CandidateRegistrationService,
        private formBuilder: FormBuilder,
        private activeModal: NgbActiveModal,
    ) {

    }

    ngOnInit() {
        this.candidatetitle = 'Add Candidate';
        this.parentform = this.formBuilder.group({
            firstName: '',
            lastName: '',
            email: '',
            experience: null,
            qualifications: '',
            skill: '',
            graduation: null,
            mobilenumber: null,
            pastcompanyname: '',
            remark: '',
        });
        this.dropdownList = [
            { item_id: 1, item_text: '.Net FullStack' },
            { item_id: 2, item_text: 'Java FullStack' },
            { item_id: 3, item_text: 'UI Developer' },
            { item_id: 4, item_text: 'Automation Testing' },
            { item_id: 5, item_text: 'Manual Testing' },
            { item_id: 6, item_text: 'Others' }
        ];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 10,
            allowSearchFilter: true
        };
    }
    onPost() {
        console.log(this.parentform.value);
        this.candidateDetails = this.parentform.value;
        if (this.parentform.valid) {
            this.candidateregistrationservice.postCandidateDetails(this.candidateDetails).subscribe(
                data => {
                    this.activeModal.close(data);
                }
            );
        }
    }
}
