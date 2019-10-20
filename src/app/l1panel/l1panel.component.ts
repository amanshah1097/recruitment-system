import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreHelperService } from '../core/core-helper.service';
import { CommonModule } from '@angular/common';
import { L1Panel } from './l1panel.classes';
import { L1PanelCreateComponent } from './l1panel-create-edit/l1panel-create.component';


@Component({
  selector: 'app-l1panel',
  templateUrl: './l1panel.component.html',
  styleUrls: ['./l1panel.component.scss']
})
export class L1PanelComponent implements OnInit {

  l1PanelData: L1Panel;

  constructor(
    private modalService: NgbModal,
    private coreHelperService: CoreHelperService,
  ) {
  }

  ngOnInit() {

  }
  addL1Panel (content1: string) {
    const modalRef = this.modalService.open(L1PanelCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((data: Array<L1Panel>) => {
      if (!this.coreHelperService.isArrayEmpty(data)) {

      }
    });
  }
}

