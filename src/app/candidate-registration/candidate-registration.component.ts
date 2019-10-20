import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import { element } from 'protractor';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Array } from 'core-js/library/web/timers';
import { CoreHelperService } from '../core/core-helper.service';
import { CommonModule } from '@angular/common';
import { IdNameModel } from '../core/core.classes';
import { filerdata } from '../shared/data/smart-data-table';
import { toInt } from 'ngx-bootstrap/chronos/utils/type-checks';
import { CandidateRegistrationService } from './candidate-registration.service';
import { CandidateRegistrationCreateComponent } from './candidate-registration-create-edit/candidate-registration-create.component';
import { CandidateRegistration } from './candidate-registration.classes';


@Component({
  selector: 'app-candidate-registration',
  templateUrl: './candidate-registration.component.html',
  styleUrls: ['./candidate-registration.component.scss']
})
export class CandidateRegistrationComponent implements OnInit {

  candidateData: CandidateRegistration;

  constructor(
    private modalService: NgbModal,
    private coreHelperService: CoreHelperService,
    private candidateRegistrationService: CandidateRegistrationService,
  ) {
  }

  ngOnInit() {
  }
  // addCandidfdfdate(content) {
  //   const modalRef = this.modalService.open(CandidateRegistrationCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  //   modalRef.result.then((data:Array<CandidateRegistration>) => {
  //    });
  // }
  addCandidate(content) {
    const modalRef = this.modalService.open(CandidateRegistrationCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((data: Array<CandidateRegistration>) => {
      if(!this.coreHelperService.isArrayEmpty(data)) {

      }
    });
  }
  democall(content) {
    this.candidateRegistrationService.getCandidateDetails();
  }
}

