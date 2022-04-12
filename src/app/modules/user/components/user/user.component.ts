import { Component, OnInit } from '@angular/core';
import {
  User,
} from "../../../../model/user";
import { ActivatedRoute } from "@angular/router";
import {
  Album,
} from "../../../../model/album";
import { Post } from "../../../../model/post.model";
import {
  DataService,
  GetCollectionParams
} from "../../../../services/data.service";
import {
  combineLatest,
  take
} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User ;
  isLoading = false;
  userId:number;
  albums: Album[] = [];
  posts: Post[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    const userIdStr = this.activatedRoute.snapshot.params['id'];
    this.userId = parseInt(userIdStr,10);
    const getAlbumsParams: GetCollectionParams = {
      pageSize: 5,
      pageNumber: 0,
      filters: [{fieldName: 'userId', expression: userIdStr, operator: 'eq'}]
    }
    const getPostsParams: GetCollectionParams = {
      pageSize: 5,
      pageNumber: 0,
      filters: [{fieldName: 'userId', expression: userIdStr, operator: 'eq'}]
    }

    combineLatest([
      this.dataService.getUser(this.userId),
      this.dataService.getAlbums(getAlbumsParams),
      this.dataService.getPosts(getPostsParams),
    ]).pipe(take(1))
      .subscribe(([user, albumsCollection, postsCOllectoin]) => {
        this.user = user;
        this.albums = albumsCollection.items;
        this.posts = postsCOllectoin.items;
        this.isLoading = false;
      });

  }

}
