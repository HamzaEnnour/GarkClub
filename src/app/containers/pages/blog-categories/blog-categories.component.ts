import { Component, OnInit } from '@angular/core';
import { blogCategories } from '../../../data/blog';
@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html'
})
export class BlogCategoriesComponent implements OnInit {
  data = blogCategories.slice();
  constructor() { }

  ngOnInit() {
  }

}
