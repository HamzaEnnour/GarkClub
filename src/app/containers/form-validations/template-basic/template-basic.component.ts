import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-basic',
  templateUrl: './template-basic.component.html'
})
export class TemplateBasicComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);
  }

}


