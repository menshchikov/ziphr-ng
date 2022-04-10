import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumComponent } from './components/album/album.component';
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
          {path: '', component: AlbumsComponent},
          {path: ':id', component: AlbumComponent}
        ]),
        NgbModule
    ]
})
export class AlbumsModule { }
