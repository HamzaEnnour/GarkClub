import { Component, OnInit } from '@angular/core';
import ticketItems, { ITicket } from 'src/app/data/tickets';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  constructor() { }

  data: ITicket[] = ticketItems;


  ngOnInit() {
  }

}
