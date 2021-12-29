import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingComponent } from './components/heading/heading.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutComponent } from './components/about/about.component';
import { ItemComponent } from './components/inventory/item/item.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ModalComponent } from './components/modal/modal.component';
import {DatesService} from './services/dates.service';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    NavComponent,
    AboutComponent,
    ItemComponent,
    HomeComponent,
    ErrorpageComponent,
    DatePickerComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DatesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
