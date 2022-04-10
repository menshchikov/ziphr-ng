import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from "./components/error-msg/error-msg.component";

@NgModule({
  declarations: [
    ErrorMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrorMsgComponent
  ]
})
export class UtilsModule { }
