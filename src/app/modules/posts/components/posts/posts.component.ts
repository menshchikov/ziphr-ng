import { Component, OnInit } from '@angular/core';
import {POSTSMOCK} from "../../../../model/posts-mock";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor() { }
  posts = POSTSMOCK;
  public filter = 'User';

  ngOnInit(): void {
  }

  setFilter(filter: string) {
    this.filter = filter;
  }
}
