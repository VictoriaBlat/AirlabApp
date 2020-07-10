import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { FlightComponent } from './flight/flight.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { PassengersDetailsComponent } from './passengers-details/passengers-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSearchComponent } from './dialog-search/dialog-search.component';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';
import { MatSelectModule } from '@angular/material/select';
import { ChooseSeatsDialogComponent } from './choose-seats-dialog/choose-seats-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChooseSeatsComponent } from './choose-seats/choose-seats.component';
import { PlaneBInternationalComponent } from './choose-seats/plane-b-international/plane-b-international.component';
import { PlaneCContinentalComponent } from './choose-seats/plane-c-continental/plane-c-continental.component';
import { PlaneADomesticComponent } from './choose-seats/plane-a-domestic/plane-a-domestic.component';
import { AddMoreDialogComponent } from './add-more-dialog/add-more-dialog.component';
import { WrongLoginComponent } from './wrong-login/wrong-login.component';
import { DialogWrongDateComponent } from './flight/dialog-wrong-date/dialog-wrong-date.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    FlightComponent,
    LoginComponent,
    SummaryComponent,
    PassengersDetailsComponent,
    DialogSearchComponent,
    SessionTimeoutComponent,
    ChooseSeatsDialogComponent,
    ChooseSeatsComponent,
    PlaneBInternationalComponent,
    PlaneCContinentalComponent,
    PlaneADomesticComponent,
    AddMoreDialogComponent,
    WrongLoginComponent,
    DialogWrongDateComponent,
  ],
  entryComponents: [DialogSearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
