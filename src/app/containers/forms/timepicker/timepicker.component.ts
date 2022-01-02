import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimepickerComponent implements OnInit {

  basicTime = new Date();
  secondsTime = new Date();
  stepsTime = new Date();
  mouseTime = new Date();
  constructor() { }

  ngOnInit() {
  }

}
