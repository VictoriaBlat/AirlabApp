import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  bookingData;
  isbooked = false;
  bookedSeats = [];
  numberOfPassengers: number;
  // choosenSeats = 0;
  // seatsLeft;
  left;

  constructor() {}

  ngOnInit(): void {
    this.bookingData = JSON.parse(localStorage.getItem('booking'))[0];
    console.log(this.bookingData);
    this.countPassengers();
    // this.seatsLeft = this.numberOfPassengers - this.choosenSeats;
  }
  bookSeat($event, seatNumber) {
    //TODO: When left seats = 0. deactivate function
    // this.seatsLeft = this.numberOfPassengers;
    console.log('booked seats bevore:', this.bookedSeats);
    if (this.bookedSeats.includes(seatNumber.id)) {
      this.bookedSeats = this.bookedSeats.filter((item) => {
        return item !== seatNumber.id;
      });
      // this.choosenSeats = this.choosenSeats - 1;

      console.log(this.bookedSeats.includes(seatNumber.id));
    } else {
      console.log(event.srcElement);
      console.log(seatNumber.id);
      this.bookedSeats.push(seatNumber.id);
      // this.choosenSeats = this.choosenSeats + 1;
      // this.seatsLeft = this.numberOfPassengers - this.choosenSeats;

      console.log(this.bookedSeats.includes(seatNumber.id));
    }
    // event.srcElement.classList.add('booked');
    console.log('booked seats after:', this.bookedSeats);
    this.left = this.numberOfPassengers - this.bookedSeats.length;
  }
  countPassengers() {
    let { adults, childs, infants } = this.bookingData.passengers;
    this.numberOfPassengers = adults + childs + infants;
    this.left = this.numberOfPassengers;
  }
}
