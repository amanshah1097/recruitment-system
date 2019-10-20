import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// import Quill from 'quill';

import { EditorService } from './editor.service';
import { data } from '../../../shared/data/smart-data-table';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  // declarations
  title = 'Quill works!';
  hide = false;
  isReadOnly = false;
  form: FormGroup;
  validMessage: string = "";

  @ViewChild('editor') editor: QuillEditorComponent
  constructor(fb: FormBuilder, private editorservice: EditorService) {
    this.form = fb.group({
      editor: ['test']
    });
  }

  ngOnInit() {
    // this.form
    //   .controls
    //   .editor
    //   .valueChanges.pipe(
    //     debounceTime(400),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(data => {
    //     console.log('native fromControl value changes with debounce', data)
    //   });

    // this.editor
    //   .onContentChanged
    //   .pipe(
    //     debounceTime(400),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(data => {
    //     console.log('view child + directly subscription', data)
    //   });
  }

  // events starts

  // post(): void {
  //   debugger;
  //   if (this.form.valid) {
  //     this.validMessage = "Your comment has been posted.";
  //     this.editorservice.postComment(this.form.value).subscribe(
  //       data => {
  //         this.form.reset();
  //         return true;
  //       },
  //       error => {
  //         return Observable.throw(error);
  //       }
  //     )
  //   } else {
  //     this.validMessage = "Please fill out the comment before posting!";
  //   }
  // }

  // setFocus($event) {
  //   $event.focus();
  // }

  // patchValue() {
  //   this.form.controls['editor'].patchValue(`${this.form.controls['editor'].value} patched!`)
  // }

  // toggleReadOnly() {
  //   this.isReadOnly = !this.isReadOnly;
  // }

  // logChange($event: any) {
  //   // your code here
  // }

  // logSelection($event: any) {
  //   // your code here
  // }
  // events ends

}
