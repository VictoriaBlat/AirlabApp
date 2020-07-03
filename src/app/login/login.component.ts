import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { users } from './users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public comUser = '';
  public loggedIn = false;
  user = localStorage.getItem('userLogedIn');
  userName;
  constructor(private router: Router, private _location: Location) {}

  ngOnInit() {
    if (this.user) {
      let data = JSON.parse(localStorage.getItem('userLogedIn'));
      this.userName = data.firstName;
    }
  }

  log(email, password) {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email == email.value.toLowerCase() &&
        users[i].password == password.value
      ) {
        this.comUser = 'Loged in. You will be redirected';
        this.loggedIn = true;
        localStorage.setItem('userLogedIn', JSON.stringify(users[i]));
        localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
        this.user = JSON.parse(localStorage.getItem('userLogedIn'));
        let data = JSON.parse(localStorage.getItem('userLogedIn'));
        console.log(JSON.parse(localStorage.getItem('userLogedIn')));
        console.log(data.firstName);
        this.userName = data.firstName;
        console.log('user logged:', this.user);
        this._location.back();
        // this.router.navigate(['/details']);
        // window.location.reload();

        break;
      } else {
        this.comUser = 'błędne dane lub uzytkownik nie istnieje';
      }
    }
  }
  logOut() {
    localStorage.clear();
    window.location.reload();
  }
}
