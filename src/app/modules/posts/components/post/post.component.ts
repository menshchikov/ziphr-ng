import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../../model/post.model";
import {POSTSMOCK} from "../../../../model/posts-mock";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public postId = '';
  public post: Post|undefined;
  public isLoading = false;

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.postId = params["id"];
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.post = POSTSMOCK[0];
      this.isLoading = false;
    },1000)

  }

}
