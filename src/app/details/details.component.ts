import { Component, OnInit } from '@angular/core';
import { connectionsInfo, extraCosts } from '../connectionsInfo';
import { AddMoreDialogComponent } from '../add-more-dialog/add-more-dialog.component';
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
  numberOfPassengers: number;
  totalPriceEUR: number;
  selectedCurrency = 1;
  euro = '€';
  option = 'basic';
  extrasTotal = 0;
  pln: number;
  usd: number;

  constructor(public buyMore: MatDialog) {}

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

  countPassengers() {
    let { adults, childs, infants } = this.bookingData.passengers;
    this.numberOfPassengers = adults + childs + infants;
  }
  goToDetails() {
    if (this.option === 'basic') {
      this.buyMore.open(AddMoreDialogComponent);
    }
  }
}
