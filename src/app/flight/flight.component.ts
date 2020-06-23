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

  departure: string;
  ngOnInit() {
    console.log(this.today);
    console.log(typeof this.today);
  }
  public cities = ['Warszawa', 'Paryż', 'Nowy Jork'];
  public opts = [
    { key: 'warsaw', value: ['paris,new york'] },
    { key: 'paris', value: ['warsaw,new york'] },
    { key: 'new york', value: ['warsaw, paris,'] },
  ];
  public choosenDeparture;
  public arrivals;

  changeDeparture(event) {
    this.choosenDeparture = event.target.value;

    for (let i = 0; i < this.opts.length; i++) {
      if (this.opts[i].key === this.choosenDeparture) {
        this.arrivals = this.opts[i].value;
      }
    }

    console.log('arrival ', this.arrivals);
  }
  saving() {}

  counter() {}
}
