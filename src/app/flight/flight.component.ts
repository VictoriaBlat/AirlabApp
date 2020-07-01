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
  isOpen = false;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  departureCity: string;
  arrivalCity: string;
  arrivalOptions;
  isShow = true;
  roundTrip = true;
  trip;
  missingData1;

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
  openPassengers() {
    this.isOpen = !this.isOpen;
  }
  changeTrip() {
    this.roundTrip = !this.roundTrip;
  }
  @Output() public bookingEvent = new EventEmitter();
  setTime(event) {
    this[event.target.id] = event.target.value;
  }

  changeDeparture(event) {
    this.departureCity = event.target.value;
    for (let i = 0; i < this.opts.length; i++) {
      if (this.opts[i].city === this.departureCity) {
        this.arrivalOptions = this.opts[i].value;
      }
    }
  }
  changeArrivalCity(event) {
    this.arrivalCity = event.target.value;
    //move the following part to details component coditions
    let aCode;
    this.opts.forEach((city) => {
      if (city.city === this.arrivalCity) {
        aCode = city.country;
      }
    });
    //Time of departure
    this.opts.forEach((city) => {
      if (city.city === this.departureCity) {
        city.value.forEach((arrival) => {
          if (arrival.city === this.arrivalCity) {
            this.departureTime = arrival.departureTime;
          }
        });
      }
    });
  }
  // <------------------_CHANGING PASSANGERS START---------------->
  changePassengers() {
    // TODO: TOGGLE CLASS VISSIBILITY ADDING PASSENGERS
  }
  deletePassengers(ev) {
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
    if (this.arrivalCity == null) {
      this.missingData1 = 'You must choose the arrival';
    } else {
      this.missingData1 = null;
    }
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
