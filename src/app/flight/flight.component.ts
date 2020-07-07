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
  matButtonToggleGroup;
  toggleGroup;
  price = [];
  planeCode: string;
  totalPrice: number;
  //DELETE later!!!!!!
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

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
  biedronka(ev) {
    console.log('fired');
    console.log(ev.value);
  }
  openDialog() {
    this.dialog1.open(DialogSearchComponent);
  }
  ngOnInit() {
    console.log('departuredate:', this.departureDate);
    let cities = this.opts.forEach((city) => {});

    this.roundTrip = true;
  }
  openPassengers() {
    this.isOpen = !this.isOpen;
  }
  changeTrip() {
    this.roundTrip = !this.roundTrip;
  }
  @Output() public bookingEvent = new EventEmitter();
  setTime(event) {
    console.log(event);
    this[event.target.id] = event.target.value;
  }

  changeDeparture(event) {
    this.departureCity = event.value.city;
    for (let i = 0; i < this.opts.length; i++) {
      if (this.opts[i].city === this.departureCity) {
        this.arrivalOptions = this.opts[i].value;
      }
    }
  }
  changeArrivalCity(event) {
    this.arrivalCity = event.value;
    console.log(this.arrivalCity);
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

  deletePassengers(ev) {
    let id = ev._elementRef.nativeElement.id;
    console.log('id type', id);
    if (this.passengers['adults'] >= 1) {
      console.log('adults are:', this.passengers['adults']);
      if (this.passengers[id] > 0) {
        console.log('how many before:', this.passengers[id]);
        this.passengers[id] = this.passengers[id] - 1;
        console.log('how many after:', this.passengers[id]);
      }
    }
    this.countTotalPassangers();
  }
  addPassengers(ev) {
    let id = ev._elementRef.nativeElement.id;

    if (this.totalpassengers < 9) {
      this.passengers[id] = this.passengers[id] + 1;
      console.log(this.passengers[id]);
    }
    this.countTotalPassangers();
  }
  countTotalPassangers() {
    let { adults, childs, infants } = this.passengers;
    this.totalpassengers = adults + childs + infants;
  }
  // <------------------_CHANGING PASSANGERS END---------------->

  searchFlight() {
    if (
      (this.roundTrip === true && this.arrivalDate == null) ||
      this.arrivalCity == null ||
      this.departureDate == null ||
      this.departureCity == null
    ) {
      {
        this.openDialog();
      }
      // this.missingData1 = 'You must choose the arrival';
      // this.openDialog();
    }
    if (this.roundTrip === true) {
      this.totalPrice = this.totalpassengers * (this.price[0] + this.price[1]);
    } else {
      this.totalPrice = this.totalpassengers * this.price[0];
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
        basePrice: this.totalPrice,
        numberOfPassengers: this.totalpassengers,
      },
    ];

    localStorage.setItem('booking', JSON.stringify(this.bookingData));
    this.bookingEvent.emit(this.bookingData);
    setTimeout(() => {
      this.sessionPassed();
      localStorage.clear();
    }, 120000); //120000 ??
  }
}
