import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFollowComponent } from './user-follow/user-follow.component';
import { RecentPostComponent } from './recent-post/recent-post.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
  UserFollowComponent,
  RecentPostComponent,
  PostComponent
],
  imports: [
    CommonModule,
  ],
  providers: [], 
  exports: [
    UserFollowComponent,
    RecentPostComponent,
    PostComponent
  ]
})

export class ComponentsPagesModule { }
