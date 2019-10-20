import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap/modal/modal-dismiss-reasons';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  currentJustify = 'start';
  closeResult: string;
  // temp: number;

  constructor(private modalService: NgbModal) {

  }
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });

  hasBaseDropZoneOver = false;
  hasBaseDropZoneClick = false;
  // hasAnotherDropZoneOver = false;

  // Angular2 File Upload
  fileOverBase(event: boolean): void {
    this.hasBaseDropZoneOver = event;
  }
  fileClickBase(event: boolean): void {
    this.hasBaseDropZoneClick = event;
  }
  onFilesDropped(event) {
    console.log(event);
  }
  openModal(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
