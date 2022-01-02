import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-common',
  templateUrl: './template-common.component.html'
})
export class TemplateCommonComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);
  }

}
