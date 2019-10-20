import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { CommentService } from '../comment.service';
import { data } from '../../shared/data/smart-data-table';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms/src/model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  title = 'Quill works!';
  hide = false;
  isReadOnly = false;
  parentform: FormGroup;
  message: string;
  formResult: { comment: string };
  validMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private commentservice: CommentService
  ) {
  }

  ngOnInit() {

    this.parentform = this.formBuilder.group({
      comment: ''
    });

  }

  onPost() {
    this.formResult = this.parentform.value;
    if (this.parentform.valid) {
      this.validMessage = "Your comment has been posted.";
      this.commentservice.postComment(this.parentform.value).subscribe(
        data => {
          this.parentform.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the comment before posting!";
    }
  }

  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
  }

  logChange($event: any) {
  }

  logSelection($event: any) {
  }
}
