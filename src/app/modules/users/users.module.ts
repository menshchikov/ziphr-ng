import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { UserComponent } from './components/user/user.component';
import { DataService } from "../../services/data.service";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from "../utils/components/not-found/not-found.component";
import { UtilsModule } from "../utils/utils.module";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: UserComponent },
      { path: '**', component: NotFoundComponent, },
    ]),
    HttpClientModule,
    UtilsModule
  ],
  providers:[
    DataService
  ]
})
export class UsersModule { }
