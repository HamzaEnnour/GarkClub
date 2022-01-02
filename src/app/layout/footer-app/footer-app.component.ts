import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-app',
  templateUrl: './footer-app.component.html',
  styleUrls: ['./footer-app.component.scss']
})
export class FooterAppComponent implements OnInit {

  year: number = 2020;
  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
