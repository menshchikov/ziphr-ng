import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./modules/utils/components/not-found/not-found.component";

export const routes: Routes = [
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
    path: 'users', loadChildren: () => {
      return import('./modules/users/users.module').then(m => m.UsersModule);
    }
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
