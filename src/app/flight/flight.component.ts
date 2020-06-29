import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { connectionsInfo } from '../connectionsInfo';
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  opts = connectionsInfo;
  departureDate: string;
  arrivalDate: string;
  departureCity;
  arrivalCity: string;
  arrivalOptions;
  bookingData = [];
  passengers = { adults: 1, childs: 0, infants: 0 };
  totalpassengers = 0;
  public today = `${new Date().getFullYear()}-0${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  constructor(private router: Router) {}
  ngOnInit() {
    let cities = this.opts.forEach((city) => {});
  }

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
  }
  changeArrivalCity(event) {
    this.arrivalCity = event.target.value;
    console.log(this.arrivalCity);
    //move the following part to details component coditions
    let aCode;
    this.opts.forEach((city) => {
      if (city.city === this.arrivalCity) {
        aCode = city.country;
      }
    });

    console.log(aCode);
  }
  // <------------------_CHANGING PASSANGERS START---------------->
  changePassengers() {}
  deletePassengers(ev) {
    console.log('fired');
    console.log(typeof ev.id);
    if (this.passengers[ev.id] > 0) {
      this.passengers[ev.id] = this.passengers[ev.id] - 1;
    }
  }
  addPassengers(ev) {
    this.countTotalPassangers();

    if (this.totalpassengers < 10) {
      this.passengers[ev.id] = this.passengers[ev.id] + 1;
    }
    this.countTotalPassangers();
  }
  countTotalPassangers() {
    let { adults, childs, infants } = this.passengers;
    this.totalpassengers = adults + childs + infants;
  }
  // <------------------_CHANGING PASSANGERS END---------------->

  searchFlight() {
    this.bookingData = [
      {
        departureDate: this.departureDate,
        arrivalDate: this.arrivalDate,
        departureCity: this.departureCity,
        arrivalCity: this.arrivalCity,
        passengers: this.passengers,
      },
    ];
    localStorage.setItem('booking', JSON.stringify(this.bookingData));
    this.bookingEvent.emit(this.bookingData);
  }
}
