import { Component, OnInit, Input } from '@angular/core';
import { IPriceItem } from 'src/app/data/prices';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
})
export class PriceCardComponent implements OnInit {

  @Input() price: IPriceItem;

  constructor() { }

  ngOnInit() {
  }

}
