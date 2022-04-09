import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumComponent } from './components/album/album.component';



@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AlbumsModule { }
