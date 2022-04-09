import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotoComponent } from './components/photo/photo.component';



@NgModule({
  declarations: [
    PhotosComponent,
    PhotoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PhotosModule { }
