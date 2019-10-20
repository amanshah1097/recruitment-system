import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
// import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {

  }

  setFocus($event) {
    $event.focus();
  }

}
