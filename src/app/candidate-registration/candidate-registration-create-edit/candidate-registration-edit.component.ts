import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { Dsr } from 'app/dailystatusreport/dailystatusreportclasses';
import { Input } from '@angular/core';
import { CandidateRegistrationComponent } from '../candidate-registration.component';
import { CandidateRegistrationService } from '../candidate-registration.service';


@Component({
  selector: 'app-candidate-registration-edit',
  templateUrl: './candidate-registration-create-edit.tmpl.component.html',
  styleUrls: ['../candidate-registration.component.scss',]
})
export class CandidateRegistrationEditComponent implements OnInit {

//   hide = false;
//   isReadOnly = false;
//   parentform: FormGroup;
//   message: string;
//   validMessage: string = "";
//   dsrTitle: string = '';
//   @Input() dsrData: Dsr;
  constructor(
    //   private dsrservice: DailyStatusReportService,
    // private formBuilder: FormBuilder,
    // private modalService: NgbModal,
    // private activeModal: NgbActiveModal,
  ) {

  }
//   sampleCommentObject: Object

  ngOnInit() {
    // var date = new Date(this.dsrData.dsrDate);
    // let dsrDate;
    // this.dsrTitle = 'Edit DSR';
    // dsrDate = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }
    // this.dsrData.dsrDate = moment(this.dsrData.dsrDate).format("YYYY-MM-DD");
    // this.parentform = this.formBuilder.group({
    //   dsrDetails: this.dsrData.dsrDetails,
    //   dsrDate: dsrDate
    // });
  }

  onPost() {
    // let dataToSave = this.parentform.value;
    // let dsrDate: NgbDate = this.parentform.value.dsrDate;
    // dataToSave.dsrDate = (moment(`${dsrDate.year}-${dsrDate.month}-${dsrDate.day}`, "YYYY-MM-DD").format());
    // dataToSave.id = this.dsrData.id;
    // if (this.parentform.valid) {
    //   this.validMessage = "Your comment has been posted.";
    //   this.dsrservice.postComment(dataToSave).subscribe(
    //     data => {
    //       this.activeModal.close(dataToSave);
    //     },
    //     error => {
    //       return Observable.throw(error);
    //     }
    //   )
    // } else {
    //   this.validMessage = "Please fill out the comment before posting!";
    // }
  }
}
