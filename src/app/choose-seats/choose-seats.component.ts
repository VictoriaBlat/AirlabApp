import { Component, OnInit } from '@angular/core';
const MAX_SEATS = 9;
@Component({
  selector: 'app-choose-seats',
  templateUrl: './choose-seats.component.html',
  styleUrls: ['./choose-seats.component.css'],
})
export class ChooseSeatsComponent implements OnInit {
  bookingData;
  planeType;
  ngOnInit() {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    console.log(this.bookingData);
    this.planeType = this.bookingData.planeCode;
    console.log(this.planeType);
  }
  constructor() {}
}
