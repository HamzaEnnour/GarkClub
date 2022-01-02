import { Component, OnInit } from '@angular/core';
import productItems from 'src/app/data/products';
import { IProduct } from 'src/app/data/api.service';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html'
})
export class RecentOrdersComponent implements OnInit {

  constructor() { }

  data: IProduct[] = productItems.slice(0, 6);
  ngOnInit() {
  }

}
