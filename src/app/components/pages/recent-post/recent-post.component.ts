import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.component.html'
})
export class RecentPostComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
