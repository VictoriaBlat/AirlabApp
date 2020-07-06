import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passengers-details',
  templateUrl: './passengers-details.component.html',
  styleUrls: ['./passengers-details.component.css'],
})
export class PassengersDetailsComponent implements OnInit {
  bookingData;
  departureTimeA;
  test = 1;
  passengersData = [];
  userLogedIn;
  isTheUserNotLogged;
  constructor() {}

  ngOnInit(): void {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    this.userLogedIn = JSON.parse(localStorage.getItem('userLogedIn'));
    console.log(this.userLogedIn);
    if (this.userLogedIn.id.length > 0) {
      this.isTheUserNotLogged = false;
    }

    for (let i = 0; i < this.bookingData.numberOfPassengers; i++) {
      this.passengersData.push({ name: '', surname: '', email: '' });
    }
    console.log(this.passengersData);
  }

  submitingInfo() {
    console.log(this.passengersData);
    localStorage.setItem('passengersData', JSON.stringify(this.passengersData));
  }
  changeCurrency() {}
}
