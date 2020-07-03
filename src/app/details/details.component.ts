import { Component, OnInit } from '@angular/core';
import { connectionsInfo } from '../connectionsInfo';
import { ChooseSeatsDialogComponent } from '../choose-seats-dialog/choose-seats-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  info = connectionsInfo;
  bookingData;
  isbooked = false;
  bookedSeats = [];
  numberOfPassengers: number;
  left;
  departureTimeA;
  totalPriceEUR;
  totalPricePLN;
  totalPriceUSD;
  selectedCar;

  constructor(public chooseSeats: MatDialog) {}

  ngOnInit(): void {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    this.countPassengers();
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
    this.left = this.numberOfPassengers - this.bookedSeats.length;
  }
  countPassengers() {
    let { adults, childs, infants } = this.bookingData.passengers;
    this.numberOfPassengers = adults + childs + infants;
    this.left = this.numberOfPassengers;
  }
  goToDetails() {
    if (this.bookedSeats.length !== this.numberOfPassengers) {
      this.chooseSeats.open(ChooseSeatsDialogComponent);
      // alert('You must choose seats for all passengers');
    }
    localStorage.setItem('seats', JSON.stringify(this.bookedSeats));
  }
  getPln() {
    fetch('https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json')
      .then((resp) => resp.json())
      .then((data) => {
        this.totalPricePLN = (this.totalPriceEUR / data.rates[0].mid).toFixed(
          0
        );
      });
  }

  countUsd() {
    fetch('https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json')
      .then((resp) => resp.json())
      .then((data) => {
        this.totalPriceUSD = (this.totalPricePLN * data.rates[0].mid).toFixed(
          0
        );
      });
  }
  changeCurrency() {
    console.log('selectedCar', this.selectedCar);
    console.log('fired');
  }
}
