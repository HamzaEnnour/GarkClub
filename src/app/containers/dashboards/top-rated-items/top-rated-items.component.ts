import { Component, OnInit } from '@angular/core';
import topRatedItems, { ITopRatedItem } from 'src/app/data/top-rated-items';

@Component({
  selector: 'app-top-rated-items',
  templateUrl: './top-rated-items.component.html'
})
export class TopRatedItemsComponent implements OnInit {

  data: ITopRatedItem[] = topRatedItems;
  rate = 5;
  constructor() { }

  ngOnInit() {
  }

}
