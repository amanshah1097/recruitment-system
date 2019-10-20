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
import { Drive } from './drive.classes';
import { DriveCreateComponent } from './drive-create-edit/drive-create.component';


@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  driveData: Drive;

  constructor(
    private modalService: NgbModal,
    private coreHelperService: CoreHelperService,
  ) {
  }

  ngOnInit() {

  }
  addDrive(content) {
    const modalRef = this.modalService.open(DriveCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((data: Array<Drive>) => {
      if (!this.coreHelperService.isArrayEmpty(data)) {

      }
    });
  }
}

