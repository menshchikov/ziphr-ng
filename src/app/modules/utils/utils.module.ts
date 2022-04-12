import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from "./components/error-msg/error-msg.component";
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    ErrorMsgComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
    exports: [
        ErrorMsgComponent,
        PaginatorComponent
    ]
})
export class UtilsModule { }
