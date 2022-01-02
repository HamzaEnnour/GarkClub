import { Component, OnInit } from '@angular/core';
import recentPost, { IRecentPost } from '../../../data/recent-posts';

@Component({
  selector: 'app-profile-recent-posts',
  templateUrl: './profile-recent-posts.component.html'
})
export class ProfileRecentPostsComponent implements OnInit {
  data: IRecentPost[] = recentPost.slice(0, 5);

  constructor() { }

  ngOnInit() {
  }

}
