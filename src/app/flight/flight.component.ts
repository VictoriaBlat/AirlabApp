import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  constructor(private router: Router) {}
  public today = `${new Date().getFullYear()}-0${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  ngOnInit() {
    console.log(this.today);
    console.log(typeof this.today);
  }
  public cities = ['Warszawa', 'Paryż', 'Nowy Jork'];
  public opts = [
    { key: 'Warsaw', value: ['Paris', 'New York'] },
    { key: 'Paris', value: ['Warsaw', 'New York'] },
    { key: 'New York', value: ['Warsaw', 'Paris'] },
  ];
  public choosenDeparture;
  public arrivals;
  departureTime;
  arrivalTime;
  setTime(event) {
    this[event.target.id] = event.target.value;
    console.log(event.target.id, event.target.value);
  }
  arrTime() {}

  changeDeparture(event) {
    this.choosenDeparture = event.target.value;

    for (let i = 0; i < this.opts.length; i++) {
      if (this.opts[i].key === this.choosenDeparture) {
        this.arrivals = this.opts[i].value;
      }
    }

    console.log('arrival ', this.arrivals);
    console.log('depart', this.departureTime);
  }
  saving() {}

  counter() {}
}
