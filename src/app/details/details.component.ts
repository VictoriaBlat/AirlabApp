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
  bookingDetails;
  numberOfPassengers: number;
  totalPriceEUR: number;
  selectedCurrency = 1;
  euro = '€';
  option = 'basic';
  extrasTotal = 0;
  pln: number;
  usd: number;
  paymentCurrency;
  total;
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
    this.totalPriceEUR = this.totalPriceEUR + this.extrasTotal;
  }

  countPassengers() {
    let { adults, childs, infants } = this.bookingData.passengers;
    this.numberOfPassengers = adults + childs + infants;
  }
  goToDetails() {
    this.paymentCurrency =
      this.selectedCurrency == this.usd
        ? 'USD'
        : this.selectedCurrency == this.pln
        ? 'PLN'
        : 'EUR';
    this.total = (this.selectedCurrency * this.totalPriceEUR).toFixed(2);
    this.bookingDetails = {
      paymentCurrency: this.paymentCurrency,
      option: this.option,
      extrasTotal: this.extrasTotal,
      total: this.total,
    };
    localStorage.setItem(
      'booking-details',
      JSON.stringify(this.bookingDetails)
    );
    if (this.option === 'basic') {
      this.buyMore.open(AddMoreDialogComponent);
    }
  }
}
