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
  user;
  constructor(private router: Router, private _location: Location) {}

  ngOnInit() {}

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
}
