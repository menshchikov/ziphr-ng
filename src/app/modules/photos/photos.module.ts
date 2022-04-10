import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotoComponent } from './components/photo/photo.component';
import {RouterModule} from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    PhotosComponent,
    PhotoComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
          { path: '', component: PhotosComponent },
          { path: ':id', component: PhotoComponent }
        ]),
        NgbModule
    ]
})
export class PhotosModule { }
