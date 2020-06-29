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

  ngOnInit() {
    let cities = this.opts.forEach((city) => {
      console.log(city.city);
    });
  }
  // public cities = ['Warszawa', 'Paryż', 'Nowy Jork'];
  // public opts = [
  //   { key: 'Warsaw', value: ['Paris', 'New York'] },
  //   { key: 'Paris', value: ['Warsaw', 'New York'] },
  //   { key: 'New York', value: ['Warsaw', 'Paris'] },
  // ];
  public opts = [
    {
      city: 'Warsaw',
      country: 'PL',
      continent: 'EU',
      value: [
        { city: 'Paris', country: 'FR', continent: 'EU' },
        { city: 'New York', country: 'US', continent: 'NA' },
      ],
    },
    {
      city: 'Paris',
      country: 'FR',
      continent: 'EU',
      value: [
        { city: 'Warsaw', country: 'PL', continent: 'EU' },
        { city: 'New York', country: 'US', continent: 'NA' },
      ],
    },
    {
      city: 'New York',
      country: 'US',
      continent: 'NA',
      value: [
        { city: 'Warsaw', country: 'PL', continent: 'EU' },
        { city: 'Paris', country: 'FR', continent: 'EU' },
      ],
    },
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
    console.log('departureCity', this.departureCity);
    for (let i = 0; i < this.opts.length; i++) {
      if (this.opts[i].city === this.departureCity) {
        this.arrivalOptions = this.opts[i].value;
      }
    }
    console.log('arrivaloptions', this.arrivalOptions);
    console.log('length', this.arrivalOptions.length);
  }
  changeArrivalCity(event) {
    console.log('fired');
    this.arrivalCity = event.target.value;
    console.log(this.arrivalCity);
    let aCode;
    this.opts.forEach((city) => {
      if (city.city === this.arrivalCity) {
        aCode = city.country;
      }
    });

    console.log(aCode);
  }
  // searchFlight() {
  //   this.bookingData = [
  //     {
  //       departureDate: this.departureDate,
  //       arrivalDate: this.arrivalDate,
  //       departureCity: this.departureCity,
  //       arrivalCity: this.arrivalCity,

  //       passengers: [],
  //     },
  //   ];
  //   localStorage.setItem('booking', JSON.stringify(this.bookingData));
  //   this.bookingEvent.emit(this.bookingData);
  // }
}
