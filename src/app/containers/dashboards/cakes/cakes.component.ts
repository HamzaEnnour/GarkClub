import { Component, OnInit } from '@angular/core';
import cakes, { ICake } from 'src/app/data/cakes';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html'
})
export class CakesComponent implements OnInit {

  data: ICake[] = cakes;
  constructor() { }

  ngOnInit() {
  }

}
