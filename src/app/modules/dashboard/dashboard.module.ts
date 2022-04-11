import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import { StoreModule } from '@ngrx/store';
import {
  dashboardFeatureKey,
  dashboardReducer
} from "./store/dashboard.reducer";
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';
import { DataService } from "../../services/data.service";
import {
  HttpClientModule,
} from "@angular/common/http";
import { UtilsModule } from "../utils/utils.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    StoreModule.forFeature(dashboardFeatureKey, dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    HttpClientModule,
    UtilsModule,
  ],
  providers:[
    DataService,
  ]
})
export class DashboardModule { }
