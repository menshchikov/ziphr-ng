import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { UserComponent } from './components/user/user.component';
import { DataService } from "../../services/data.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', component: UserComponent}
    ]),
    HttpClientModule
  ],
  providers:[
    DataService
  ]
})
export class UserModule { }
