import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  postsFeatureKey,
  postsReducer
} from "./store/posts.reducer";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "../../services/data.service";
import { PostsEffects } from "./store/posts.effects";

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: PostsComponent},
      {
        path: ":id",
        component: PostComponent
      },
    ]),
    NgbModule,
    StoreModule.forFeature(postsFeatureKey, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    HttpClientModule
  ],
  providers: [
    DataService
  ]
})
export class PostsModule { }
