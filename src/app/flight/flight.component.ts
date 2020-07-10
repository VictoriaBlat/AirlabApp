import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { connectionsInfo } from '../connectionsInfo';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';
import { SessionTimeoutComponent } from '../session-timeout/session-timeout.component';
import { DialogWrongDateComponent } from './dialog-wrong-date/dialog-wrong-date.component';
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  opts = connectionsInfo;
  isOpen = false;
  departureDate;
  maxDepartureDate;
  departureTime1: string;
  departureTime2: string;
  arrivalTime1: string;
  arrivalTime2: string;
  durration;
  arrivalDate;
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

  bookingData = [];
  passengers = { adults: 1, childs: 0, infants: 0 };
  totalpassengers = 1;
  // public today = `${new Date().getFullYear()}-0${
  //   new Date().getMonth() + 1
  // }-${new Date().getDate()}`;
  public today = new Date();
  constructor(
    private router: Router,
    public dialog1: MatDialog,
    public dialog2: MatDialog,
    public dialogDate: MatDialog
  ) {}
  sessionPassed() {
    this.dialog2.open(SessionTimeoutComponent, { disableClose: true });
  }
  changeDate(ev) {
    this[ev.targetElement.id] = ev.value;
    if (this.arrivalDate < this.departureDate) {
      this.openDialogWrongDate();
      console.log('errrrrrosss');
      this.arrivalDate = '';
    }
  }
  openDialogWrongDate() {
    this.dialogDate.open(DialogWrongDateComponent);
  }
  openDialog() {
    this.dialog1.open(DialogSearchComponent);
  }
  ngOnInit() {
    this.today = new Date();
    var year = this.today.getFullYear();
    var month = this.today.getMonth();
    var day = this.today.getDate();
    this.maxDepartureDate = new Date(year + 1, month, day);
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
            this.arrivalTime1 = arrival.arrivalTime;
            this.durration = arrival.durration;
          }
        });
      }
    });

    //ARRIVAL TIME1
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
            this.arrivalTime2 = arrival.arrivalTime;
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

    //set plane codes - plane types A=domestic connections, B=connections within the continent, C = continental connections
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
  }
  // <------------------_CHANGING PASSANGERS START---------------->

  deletePassengers(ev) {
    let id = ev._elementRef.nativeElement.id;
    if (this.passengers['adults'] >= 1) {
      if (this.passengers[id] > 0) {
        this.passengers[id] = this.passengers[id] - 1;
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
        if (this.arrivalDate < this.departureDate) {
          this.openDialogWrongDate();
          console.log('errrrrrosss');
          this.arrivalDate = '';
        }

        this.openDialog();
      }
    }
    if (this.arrivalDate < this.departureDate) {
      this.openDialogWrongDate();
      console.log('errrrrrosss');
      this.arrivalDate = '';
    }
    if (this.roundTrip === true) {
      this.totalPrice = this.totalpassengers * (this.price[0] + this.price[1]);
    } else {
      this.totalPrice = this.totalpassengers * this.price[0];
    }

    let departureDate1 = this.departureDate.toDateString();
    let arrivalDate1 = this.arrivalDate.toDateString();
    this.bookingData = [
      {
        departureDate: departureDate1,
        arrivalDate: arrivalDate1,
        departureCity: this.departureCity,
        arrivalCity: this.arrivalCity,
        passengers: this.passengers,
        price: this.price,
        departureTime1: this.departureTime1,
        departureTime2: this.departureTime2,
        arrivalTime1: this.arrivalTime1,
        arrivalTime2: this.arrivalTime2,
        durration: this.durration,
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
    }, 18000); //120000 or longer ??
  }
}
