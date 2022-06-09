import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Post } from "../../../../model/post";
import { DataService } from "../../../../services/data.service";
import {
  catchError,
  finalize,
  of,
  take
} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public postId = '';
  public post: Post|undefined;
  public isLoading = false;
  public error: HttpErrorResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService:DataService,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postId = this.activatedRoute.snapshot.params['id'];

    const postId = parseInt(this.postId, 10);
    this.dataService.getPost(postId)
      .pipe(
        take(1),
        catchError(err => {
          this.error = err;
          return of(undefined);
        }),
        finalize(() => this.isLoading = false),
      )
      .subscribe(post => this.post = post);
  }

}
