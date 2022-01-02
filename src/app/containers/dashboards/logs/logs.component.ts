import { Component, OnInit } from '@angular/core';
import logItems, { ILog } from 'src/app/data/logs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {

  constructor() { }

  data: ILog[] = logItems;

  ngOnInit() {
  }

}
