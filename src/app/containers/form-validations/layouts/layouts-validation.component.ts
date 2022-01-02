import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts-validation',
  templateUrl: './layouts-validation.component.html'
})
export class LayoutsValidationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addTagFn(addedName) {
    return { name: addedName, tag: true };
  }

}
