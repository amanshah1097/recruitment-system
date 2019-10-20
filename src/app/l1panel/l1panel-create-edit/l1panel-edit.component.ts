import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { Dsr } from 'app/dailystatusreport/dailystatusreportclasses';
import { Input } from '@angular/core';
import { L1PanelService } from '../l1panel.service';


@Component({
  selector: 'app-l1panel-edit',
  templateUrl: './l1panel-create-edit.tmpl.component.html',
  styleUrls: ['../l1panel.component.scss',]
})
export class L1PanelEditComponent implements OnInit {

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
