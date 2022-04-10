import { Component, OnInit } from '@angular/core';
import {POSTSMOCK} from "../../../../model/posts-mock";
import { Post } from "../../../../model/post.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoading = false;

  constructor() { }
  posts: Post[] = [];
  public filter = 'User';

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() =>{
      this.posts = POSTSMOCK.filter(p => p.id < 10);
      this.isLoading = false;
    }, 1000)
  }

  setFilter(filter: string) {
    this.filter = filter;
  }
}
