import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { LoginComponent } from './login/login.component';

import { DetailsComponent } from './details/details.component';
import { SummaryComponent } from './summary/summary.component';
import { PassengersDetailsComponent } from './passengers-details/passengers-details.component';
import { ChooseSeatsComponent } from './choose-seats/choose-seats.component';

const routes: Routes = [
  { path: '', redirectTo: '/flight', pathMatch: 'full' },
  { path: 'flight', component: FlightComponent },
  { path: 'log', component: LoginComponent },
  { path: 'passengers-details', component: PassengersDetailsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'choose-seats', component: ChooseSeatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
