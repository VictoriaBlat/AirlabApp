import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  constructor(private router: Router) {}
  public today = `${new Date().getFullYear()}-0${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  ngOnInit() {}
  public cities = ['Warszawa', 'Paryż', 'Nowy Jork'];
  public opts = [
    { key: 'Warsaw', value: ['Paris', 'New York'] },
    { key: 'Paris', value: ['Warsaw', 'New York'] },
    { key: 'New York', value: ['Warsaw', 'Paris'] },
  ];

  departureDate;
  arrivalDate;
  departureCity;
  arrivalCity;
  arrivalOptions;
  bookingData = [];
  @Output() public bookingEvent = new EventEmitter();
  setTime(event) {
    this[event.target.id] = event.target.value;
  }
  arrTime() {}

  changeDeparture(event) {
    this.departureCity = event.target.value;

    for (let i = 0; i < this.opts.length; i++) {
      if (this.opts[i].key === this.departureCity) {
        this.arrivalOptions = this.opts[i].value;
      }
    }
  }
  changeArrivalCity(event) {
    this.arrivalCity = event.target.value;
  }
  searchFlight() {
    this.bookingData = [
      {
        departureDate: this.departureDate,
        arrivalDate: this.arrivalDate,
        departureCity: this.departureCity,
        arrivalCity: this.arrivalCity,

        passengers: [],
      },
    ];
    localStorage.setItem('booking', JSON.stringify(this.bookingData));
    this.bookingEvent.emit(this.bookingData);
  }
}
