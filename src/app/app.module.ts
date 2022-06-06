import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import {
  routerReducer,
  StoreRouterConnectingModule
} from "@ngrx/router-store";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

