import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalInnerComponent } from './modal-inner-component';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html'
})
export class ModalComponentComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService,) { }

  openModalWithComponent() {
    const initialState = {
      list: [
        '...',
        '..'
      ],
    };
    this.bsModalRef = this.modalService.show(ModalInnerComponent, { initialState });
  }

  ngOnInit() {
  }

}

