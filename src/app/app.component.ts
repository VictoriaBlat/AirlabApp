import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'flyHigh';
  constructor() {}

  bookingData: [];

  saveBookingSearch($event) {
    this.bookingData = $event;
    console.log(this.bookingData);
  }
}
