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
  user;
  userData = { name: '', surname: '', email: '' };
  constructor() {}

  ngOnInit(): void {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    this.userLogedIn = JSON.parse(localStorage.getItem('loggedIn'));
    this.user = JSON.parse(localStorage.getItem('userLogedIn'));

    let numbOfinteration;
    if (this.userLogedIn) {
      numbOfinteration = this.bookingData.numberOfPassengers - 1;
    } else {
      numbOfinteration = this.bookingData.numberOfPassengers;
    }
    for (let i = 0; i < numbOfinteration; i++) {
      this.passengersData.push({ name: '', surname: '', email: '' });
    }
  }

  submitingInfo() {
    if (this.userLogedIn) {
      this.userData = {
        name: this.user.firstName,
        surname: this.user.lastname,
        email: this.user.email,
      };
      this.passengersData.unshift(this.userData);
    }
    localStorage.setItem('passengersData', JSON.stringify(this.passengersData));
  }
}
