import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreHelperService } from '../core/core-helper.service';
import { CommonModule } from '@angular/common';
import { Panel } from '../hrpanel/panel.classes';
import { PanelCreateComponent } from './panel-create-edit/panel-create.component';


@Component({
  selector: 'app-hrpanel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  panelData: Panel;

  constructor(
    private modalService: NgbModal,
    private coreHelperService: CoreHelperService,
  ) {
  }

  ngOnInit() {

  }
  addPanel(content) {
    const modalRef = this.modalService.open(PanelCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((data: Array<Panel>) => {
      if (!this.coreHelperService.isArrayEmpty(data)) {

      }
    });
  }
}

