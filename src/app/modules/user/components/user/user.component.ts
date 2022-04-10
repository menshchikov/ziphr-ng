import { Component, OnInit } from '@angular/core';
import {
  User,
  USERS_MOCK
} from "../../../../model/user";
import { ActivatedRoute } from "@angular/router";
import {
  Album,
  ALBUMS_MOCK
} from "../../../../model/album";
import { Post } from "../../../../model/post.model";
import { POSTSMOCK } from "../../../../model/posts-mock";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User | undefined;
  isLoading = false;
  userId = '';
  albums: Album[] = [];
  posts: Post[] = [];

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.userId = params["id"];
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.user = USERS_MOCK[0];
      this.albums = ALBUMS_MOCK.filter(a => a.id < 10);
      this.posts = POSTSMOCK.filter(p => p.id < 10);
      this.isLoading = false;
    },1000)

  }

}
