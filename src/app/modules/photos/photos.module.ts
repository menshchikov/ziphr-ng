import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotoComponent } from './components/photo/photo.component';
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../../services/data.service";
import {
  HttpClientModule
} from "@angular/common/http";
import { UtilsModule } from "../utils/utils.module";
import { NotFoundComponent } from "../utils/components/not-found/not-found.component";
import { StoreModule } from '@ngrx/store';
import * as fromPhotos from './store/photos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PhotosEffects } from './store/photos.effects';


@NgModule({
  declarations: [
    PhotosComponent,
    PhotoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PhotosComponent },
      { path: ':id', component: PhotoComponent },
      { path: '**', component: NotFoundComponent, },
    ]),
    NgbModule,
    HttpClientModule,
    UtilsModule,
    StoreModule.forFeature(fromPhotos.photosFeatureKey, fromPhotos.reducer),
    EffectsModule.forFeature([PhotosEffects])
  ],
  providers: [
    DataService
  ]
})
export class PhotosModule {
}
