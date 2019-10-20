import { Component, OnInit, Injectable } from '@angular/core';
import * as moment from 'moment';
import { DailyStatusReportService } from '../dailystatusreport.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { sample } from 'rxjs/internal/operators/sample';
import { Dsr } from '../dailystatusreportclasses';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dailystatusreport-create',
  templateUrl: '../dailystatusreport.component.tmpl.html',
  styleUrls: ['../dailystatusreport.component.scss',]
})
export class DailyStatusReportCreateComponent implements OnInit {

  hide = false;
  isReadOnly = false;
  parentform: FormGroup;
  message: string;
  validMessage: string = "";
  dsrTitle: string = '';
  allDsrData: Array<Dsr>;
  sampleCommentObject: Object
  dsrData: Dsr;
  constructor(
    private dsrservice: DailyStatusReportService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit() {
    let today = new Date();
    this.dsrTitle = 'Add DSR';
    this.parentform = this.formBuilder.group({
      dsrDetails: '',
      dsrDate: new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
    });
  }

  onPost() {
    this.dsrData = this.parentform.value;
    let dsrDate: NgbDate = this.parentform.value.dsrDate;
    this.dsrData.dsrDate = moment(`${dsrDate.year}-${dsrDate.month}-${dsrDate.day}`, "YYYY-MM-DD").format();
    if (this.parentform.valid) {
      this.validMessage = "Your comment has been posted.";
      this.dsrservice.postComment(this.dsrData).subscribe(
        data => {
          this.activeModal.close(data);
        });
    } else {
      this.validMessage = "Please fill out the comment before posting!";
    }
  }
}
