import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseSeatsDialogComponent } from 'src/app/choose-seats-dialog/choose-seats-dialog.component';
@Component({
  selector: 'app-plane-a-domestic',
  templateUrl: './plane-a-domestic.component.html',
  styleUrls: ['./plane-a-domestic.component.css'],
})
export class PlaneADomesticComponent implements OnInit {
  bookingData;
  numberOfPassengers: number;
  seatsLeft: number;
  chosenSeat: any;
  bookedSeats = [];
  constructor(public chooseSeats: MatDialog) {}

  ngOnInit(): void {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    this.numberOfPassengers = this.bookingData.numberOfPassengers;
    this.seatsLeft = this.numberOfPassengers;
  }
  onClick($event) {
    const seat = $event.target.closest('.st14');
    this.chosenSeat = seat.getAttribute('id');

    if (this.bookedSeats.includes(this.chosenSeat)) {
      seat.removeAttribute('style');
      seat.setAttribute('class', 'free st14');

      this.bookedSeats = this.bookedSeats.filter((item) => {
        return item !== this.chosenSeat;
      });
    } else if (this.numberOfPassengers > this.bookedSeats.length) {
      this.bookedSeats.push(this.chosenSeat);
      seat.removeAttribute('style');
      seat.setAttribute('class', 'occupied st14');
    }
    this.seatsLeft = this.numberOfPassengers - this.bookedSeats.length;
  }

  goToDetails() {
    if (this.bookedSeats.length !== this.numberOfPassengers) {
      this.chooseSeats.open(ChooseSeatsDialogComponent);
    }
    localStorage.setItem('seats', JSON.stringify(this.bookedSeats));
  }
}
