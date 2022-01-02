import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rate = 0;
  rateReadonly = 5;
  constructor() { }

  ngOnInit() {
  }

}
