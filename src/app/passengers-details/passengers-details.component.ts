import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passengers-details',
  templateUrl: './passengers-details.component.html',
  styleUrls: ['./passengers-details.component.css'],
})
export class PassengersDetailsComponent implements OnInit {
  bookingData;
  departureTimeA;
  totalPriceEUR;
  totalPricePLN;
  totalPriceUSD;
  selectedCar = this.totalPriceEUR;

  constructor() {}

  ngOnInit(): void {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    this.totalPriceEUR = this.bookingData.basePrice;
    console.log(this.totalPriceEUR);
    this.getPln();
    this.countUsd();
  }

  getPln() {
    fetch('https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json')
      .then((resp) => resp.json())
      .then((data) => {
        this.totalPricePLN = (this.totalPriceEUR * data.rates[0].mid).toFixed(
          0
        );
      });
  }

  countUsd() {
    fetch('https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json')
      .then((resp) => resp.json())
      .then((data) => {
        this.totalPriceUSD = (this.totalPricePLN / data.rates[0].mid).toFixed(
          0
        );
      });
  }
  changeCurrency() {
    console.log(this.totalPriceEUR, this.totalPricePLN, this.totalPriceUSD);
    console.log('selectedCar', this.selectedCar);
    console.log('fired');
    console.log('selectedCar', this.selectedCar);
    console.log('fired');
  }
}
