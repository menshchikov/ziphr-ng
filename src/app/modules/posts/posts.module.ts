import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';



@NgModule({
  declarations: [
    PostsComponent,
    PostComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostsModule { }
