import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'flyHigh';
  constructor() {}

  bookingData;
  cart: number = 0;

  saveBookingSearch($event) {
    this.bookingData = $event;
    console.log(this.bookingData);
  }
  countPassengers() {
    let { adults, childs, infants } = this.bookingData.passengers;
    this.cart = adults + childs + infants;
  }
}
