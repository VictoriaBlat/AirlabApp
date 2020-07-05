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
  test = 1;
  passengersData = [];
  constructor() {}

  ngOnInit(): void {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];

    // moved to details component
    // this.totalPriceEUR = this.bookingData.basePrice;
    // console.log(this.totalPriceEUR);
    // this.getPln();
    // this.countUsd();
    for (let i = 0; i < this.bookingData.numberOfPassengers; i++) {
      this.passengersData.push({ name: '', surname: '', email: '' });
    }
    console.log(this.passengersData);
  }

  // MOVED TO DETAILS COMPONENT
  // getPln() {
  //   fetch('https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       this.totalPricePLN = (this.totalPriceEUR * data.rates[0].mid).toFixed(
  //         0
  //       );
  //     });
  // }

  // countUsd() {
  //   fetch('https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       this.totalPriceUSD = (this.totalPricePLN / data.rates[0].mid).toFixed(
  //         0
  //       );
  //     });
  // }

  submitingInfo() {
    console.log(this.passengersData);
    localStorage.setItem('passengersData', JSON.stringify(this.passengersData));
  }
  changeCurrency() {}
}
