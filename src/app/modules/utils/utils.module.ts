import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from "./components/error-msg/error-msg.component";
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    ErrorMsgComponent,
    PaginatorComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMsgComponent,
    PaginatorComponent,
    NotFoundComponent
  ]
})
export class UtilsModule { }
