import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WizardComponent as ArcWizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-wizard-validation',
  templateUrl: './wizard-validation.component.html'
})
export class WizardValidationComponent implements OnInit {
  @ViewChild('formStep1') formStep1: NgForm;
  @ViewChild('formStep2') formStep2: NgForm;
  @ViewChild('formStep3') formStep3: NgForm;
  @ViewChild('wizard') wizard: ArcWizardComponent;

  posting = false;
  constructor() { }

  ngOnInit() {
  }

  onNextStep1() {
    this.formStep1.onSubmit(null);
    if (this.formStep1.valid) {
      this.wizard.goToNextStep();
    }
  }

  onNextStep2() {
    this.formStep2.onSubmit(null);
    if (this.formStep2.valid) {
      this.wizard.goToNextStep();
    }
  }

  onNextStep3() {
    this.formStep3.onSubmit(null);
    if (this.formStep3.valid) {
      this.posting = true;
      setTimeout(() => {
        this.posting = false;
      }, 2000);
      this.wizard.goToNextStep();
    }
  }
}
