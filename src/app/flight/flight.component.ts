import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { connectionsInfo } from '../connectionsInfo';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';
import { SessionTimeoutComponent } from '../session-timeout/session-timeout.component';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  opts = connectionsInfo;
  isOpen = false;
  departureDate: string;
  departureTime1: string;
  departureTime2: string;
  arrivalDate: string;
  departureCity: string;
  arrivalCity: string;
  arrivalOptions;
  isShow = true;
  roundTrip = true;
  trip;
  missingData1;
  matButtonToggleGroup;
  toggleGroup;
  price = [];
  planeCode;
  blub;

  bookingData = [];
  passengers = { adults: 1, childs: 0, infants: 0 };
  totalpassengers = 1;
  public today = `${new Date().getFullYear()}-0${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  constructor(
    private router: Router,
    public dialog1: MatDialog,
    public dialog2: MatDialog
  ) {}
  sessionPassed() {
    this.dialog2.open(SessionTimeoutComponent);
  }
  openDialog() {
    this.dialog1.open(DialogSearchComponent);
  }
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
    //Time of departure1
    this.opts.forEach((city) => {
      if (city.city === this.departureCity) {
        city.value.forEach((arrival) => {
          if (arrival.city === this.arrivalCity) {
            this.departureTime1 = arrival.departureTime;
          }
        });
      }
    });
    //Time of departure2
    this.opts.forEach((city) => {
      if (city.city === this.arrivalCity) {
        city.value.forEach((arrival) => {
          if (arrival.city === this.departureCity) {
            this.departureTime2 = arrival.departureTime;
          }
        });
      }
    });
    //price
    this.opts.forEach((city) => {
      if (city.city === this.departureCity) {
        city.value.forEach((arrival) => {
          if (arrival.city === this.arrivalCity) {
            this.price.push(arrival.prices[Math.floor(Math.random() * 4)]);
            if (this.roundTrip) {
              this.price.push(arrival.prices[Math.floor(Math.random() * 4)]);
            }
          }
        });
      }
    });
    console.log(this.price);
    console.log(this.departureTime1, this.departureTime2);
    //set plane codes - plane types A= connections with the country, B=connections within the continent, C = continental connections
    let departureCountry;
    let departureContinent;
    let arrivalCountry;
    let arrivalContinent;
    this.opts.forEach((city) => {
      if (city.city === this.departureCity) {
        departureCountry = city.country;
        departureContinent = city.continent;
        city.value.forEach((arrival) => {
          if (arrival.city === this.arrivalCity) {
            arrivalCountry = arrival.country;
            arrivalContinent = arrival.continent;
          }
        });
      }
    });
    console.log(this.price);
    console.log(
      departureCountry,
      departureContinent,
      arrivalCountry,
      arrivalContinent
    );
    if (departureCountry === arrivalCountry) {
      this.planeCode = 'A';
    } else if (
      departureCountry !== arrivalCountry &&
      departureContinent === arrivalContinent
    ) {
      this.planeCode = 'B';
    } else {
      this.planeCode = 'C';
    }
    console.log('plane code:', this.planeCode);
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
    // setTimeout(() => {
    //   this.sessionPassed();
    //   localStorage.clear();
    // }, 3000); //120000 ??
    console.log(
      'togglevalue',

      this.toggleGroup
    );
    if (this.arrivalCity == null) {
      this.missingData1 = 'You must choose the arrival';
      this.openDialog();
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
        price: this.price,
        departureTime1: this.departureTime1,
        departureTime2: this.departureTime2,
        planeCode: this.planeCode,
        roundTrip: this.roundTrip,
      },
    ];

    localStorage.setItem('booking', JSON.stringify(this.bookingData));
    this.bookingEvent.emit(this.bookingData);
  }
}
