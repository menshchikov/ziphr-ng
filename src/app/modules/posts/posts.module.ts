import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  postsFeatureKey,
  postsReducer
} from "./store/posts.reducer";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "../../services/data.service";
import { PostsEffects } from "./store/posts.effects";
import { UtilsModule } from "../utils/utils.module";
import { NotFoundComponent } from "../utils/components/not-found/not-found.component";

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PostsComponent },
      { path: ":id", component: PostComponent },
      { path: '**', component: NotFoundComponent, },
    ]),
    NgbModule,
    StoreModule.forFeature(postsFeatureKey, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    HttpClientModule,
    UtilsModule
  ],
  providers: [
    DataService
  ]
})
export class PostsModule {
}
