import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import productItems from 'src/app/data/products';

@Component({
  selector: 'app-academylist',
  templateUrl: './academylist.component.html',
  styleUrls: ['./academylist.component.scss']
})
export class AcademylistComponent implements OnInit {

  @Input() title = 'dashboards.best-sellers';

  rows = productItems.slice(0, 8);
  columns = [
    { prop: 'title' },
    { name: 'Sales' },
    { name: 'Stock' },
    { name: 'Category' }
  ];

  columnMode = ColumnMode;
  constructor() { }

  ngOnInit() {
  }

}
