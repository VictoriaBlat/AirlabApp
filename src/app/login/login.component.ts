import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { WrongLoginComponent } from '../wrong-login/wrong-login.component';
import { users } from './users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loggedIn = false;
  user = localStorage.getItem('userLogedIn');
  userName;
  constructor(
    private router: Router,
    private _location: Location,
    public wrongPass: MatDialog
  ) {}

  ngOnInit() {
    if (this.user) {
      let data = JSON.parse(localStorage.getItem('userLogedIn'));
      this.userName = data.firstName;
    }
  }
  openDialog() {
    this.wrongPass.open(WrongLoginComponent);
  }

  log(email, password) {
    let log = false;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email == email.value.toLowerCase() &&
        users[i].password == password.value
      ) {
        this.loggedIn = true;
        localStorage.setItem('userLogedIn', JSON.stringify(users[i]));
        localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
        this.user = JSON.parse(localStorage.getItem('userLogedIn'));
        let data = JSON.parse(localStorage.getItem('userLogedIn'));

        this.userName = data.firstName;
        log = true;
        this._location.back();
        // this.router.navigate(['/details']);
        // window.location.reload();

        break;
      } else {
        log = false;
      }
    }
    if (log === false) {
      this.openDialog();
    }
  }
  logOut() {
    localStorage.clear();
    window.location.reload();
  }
}
