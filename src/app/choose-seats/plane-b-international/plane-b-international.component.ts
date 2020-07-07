import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseSeatsDialogComponent } from 'src/app/choose-seats-dialog/choose-seats-dialog.component';

@Component({
  selector: 'app-plane-b-international',
  templateUrl: './plane-b-international.component.html',
  styleUrls: ['./plane-b-international.component.css'],
})
export class PlaneBInternationalComponent implements OnInit {
  bookingData;
  numberOfPassengers: number;
  seatsLeft: number;
  chosenSeat: any;
  bookedSeats = [];
  ngOnInit() {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    this.numberOfPassengers = this.bookingData.numberOfPassengers;
    this.seatsLeft = this.numberOfPassengers;
  }
  constructor(public chooseSeats: MatDialog) {}
  onClick($event) {
    console.log('before:', this.bookedSeats);
    const seat = $event.target.closest('.st121');
    this.chosenSeat = seat.getAttribute('id');
    console.log(this.chosenSeat);

    if (this.bookedSeats.includes(this.chosenSeat)) {
      seat.removeAttribute('style');
      seat.setAttribute('class', 'free st121');

      this.bookedSeats = this.bookedSeats.filter((item) => {
        return item !== this.chosenSeat;
      });
    } else if (this.numberOfPassengers > this.bookedSeats.length) {
      this.bookedSeats.push(this.chosenSeat);
      seat.removeAttribute('style');
      seat.setAttribute('class', 'occupied st121');
    }
    this.seatsLeft = this.numberOfPassengers - this.bookedSeats.length;
    console.log('after:', this.bookedSeats);
  }

  goToDetails() {
    if (this.bookedSeats.length !== this.numberOfPassengers) {
      this.chooseSeats.open(ChooseSeatsDialogComponent);
    }
    localStorage.setItem('seats', JSON.stringify(this.bookedSeats));
  }
}
