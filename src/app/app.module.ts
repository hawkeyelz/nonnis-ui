import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingComponent } from './components/heading/heading.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutComponent } from './components/about/about.component';
import { ItemComponent } from './components/inventory/item/item.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    NavComponent,
    AboutComponent,
    ItemComponent,
    HomeComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
