import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  booking;
  bookingDetails;
  seats;
  passengersData;
  repeatData;
  constructor() {}

  ngOnInit(): void {
    this.booking = JSON.parse(localStorage.getItem('booking'))[0];
    this.bookingDetails = JSON.parse(localStorage.getItem('booking-details'));
    this.seats = JSON.parse(localStorage.getItem('seats'));
    this.passengersData = JSON.parse(localStorage.getItem('passengersData'));

    let dataArray = this.passengersData;
    let valueArray = this.seats;
    this.repeatData = dataArray.map(function (value, index) {
      return {
        data: value,
        value: valueArray[index],
      };
    });
  }
}
