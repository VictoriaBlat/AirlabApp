import { Component, OnInit } from '@angular/core';
import { connectionsInfo, extraCosts } from '../connectionsInfo';
import { ChooseSeatsDialogComponent } from '../choose-seats-dialog/choose-seats-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  info = connectionsInfo;
  extras = extraCosts;
  bookingData;
  isbooked = false;
  bookedSeats = [];
  numberOfPassengers: number;
  seatsLeft: number;
  totalPriceEUR: number;
  selectedCurrency = 1;
  euro = '€';
  option = 'basic';
  extrasTotal = 0;
  pln: number;
  usd: number;

  constructor(public chooseSeats: MatDialog) {}

  ngOnInit(): void {
    this.getCurrencies();
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    this.countPassengers();
    this.totalPriceEUR = this.bookingData.basePrice;
  }
  getCurrencies() {
    fetch('https://api.exchangeratesapi.io/latest')
      .then((resp) => resp.json())
      .then((data) => {
        this.pln = data.rates.PLN;
        this.usd = data.rates.USD;
      });
  }
  chooseOption(id) {
    this.totalPriceEUR = this.bookingData.basePrice;
    this.option = id;
    this.extrasTotal =
      this.numberOfPassengers *
      (this.option === 'basic'
        ? 0
        : this.option === 'plus'
        ? 15
        : this.option === 'premium'
        ? 25
        : 0);
    console.log(this.extrasTotal);
    this.totalPriceEUR = this.totalPriceEUR + this.extrasTotal;
  }

  bookSeat($event, seatNumber) {
    console.log('booked seats bevore:', this.bookedSeats);
    if (this.bookedSeats.includes(seatNumber.id)) {
      this.bookedSeats = this.bookedSeats.filter((item) => {
        return item !== seatNumber.id;
      });
    } else if (this.numberOfPassengers > this.bookedSeats.length) {
      this.bookedSeats.push(seatNumber.id);
    }
    this.seatsLeft = this.numberOfPassengers - this.bookedSeats.length;
  }
  countPassengers() {
    let { adults, childs, infants } = this.bookingData.passengers;
    this.numberOfPassengers = adults + childs + infants;
    this.seatsLeft = this.numberOfPassengers;
  }
  goToDetails() {
    if (this.bookedSeats.length !== this.numberOfPassengers) {
      this.chooseSeats.open(ChooseSeatsDialogComponent);
    }
    localStorage.setItem('seats', JSON.stringify(this.bookedSeats));
  }
}
