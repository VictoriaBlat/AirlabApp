import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { FlightComponent } from './flight/flight.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { PassengersDetailsComponent } from './passengers-details/passengers-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    FlightComponent,
    LoginComponent,
    SummaryComponent,
    PassengersDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ClickOutsideModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
