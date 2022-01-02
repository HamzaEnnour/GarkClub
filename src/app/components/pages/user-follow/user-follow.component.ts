import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html'
})
export class UserFollowComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
