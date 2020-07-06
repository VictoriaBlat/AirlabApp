import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'flyHigh';

  constructor() {}

  bookingData;
  cart: number = 0;
  isLogged;
  ngOnInit() {
    this.isLogged = JSON.parse(localStorage.getItem('loggedIn'));
    console.log('is it logged', this.isLogged);
  }

  countPassengers() {
    let { adults, childs, infants } = this.bookingData.passengers;
    this.cart = adults + childs + infants;
  }
}

//TODO: NAVBAR LOGIN
