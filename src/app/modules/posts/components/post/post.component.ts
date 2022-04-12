import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../../../model/post.model";
import { DataService } from "../../../../services/data.service";
import { take } from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public postId = '';
  public post: Post|undefined;
  public isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService:DataService,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postId = this.activatedRoute.snapshot.params['id'];

    this.dataService.getPost(parseInt(this.postId, 10))
      .pipe(
        take(1)
      )
      .subscribe(post => {
        this.post = post;
        this.isLoading = false;
      });
  }

}
