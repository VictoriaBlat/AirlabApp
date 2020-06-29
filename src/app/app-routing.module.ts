import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FlightComponent } from './flight/flight.component';
import { LoginComponent } from './login/login.component';

import { DetailsComponent } from './details/details.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/flight', pathMatch: 'full' },

  // { path: '', component: AppComponent },
  { path: 'flight', component: FlightComponent },
  { path: 'log', component: LoginComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
