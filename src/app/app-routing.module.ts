import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => {
      return import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule);
    }
  },
  {
    path: 'posts', loadChildren: () => {
      return import('./modules/posts/posts.module').then(m => m.PostsModule);
    }
  },
  {
    path: 'albums', loadChildren: () => {
      return import('./modules/albums/albums.module').then(m => m.AlbumsModule);
    }
  },
  {
    path: 'photos', loadChildren: () => {
      return import('./modules/photos/photos.module').then(m => m.PhotosModule);
    }
  },
  {
    path: 'user/:id', loadChildren: () => {
      return import('./modules/user/user.module').then(m => m.UserModule);
    }
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
