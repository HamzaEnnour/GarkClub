import { Component, OnInit } from '@angular/core';
import follow, { IFollow } from '../../../data/follow';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html'
})
export class ProfileFriendsComponent implements OnInit {
  data: IFollow[] = follow.slice();

  constructor() { }

  ngOnInit() {
  }

}
