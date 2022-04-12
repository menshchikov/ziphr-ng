import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumComponent } from './components/album/album.component';
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AlbumsEffects } from "./store/albums.effects";
import {
  albumsFeatureKey,
  albumsReducer
} from "./store/albums.reducer";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "../../services/data.service";
import { UtilsModule } from "../utils/utils.module";

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AlbumsComponent },
            { path: ':id', component: AlbumComponent }
        ]),
        NgbModule,
        StoreModule.forFeature(albumsFeatureKey, albumsReducer),
        EffectsModule.forFeature([AlbumsEffects]),
        HttpClientModule,
        UtilsModule
    ],
  providers:[
    DataService,
  ]
})
export class AlbumsModule { }
