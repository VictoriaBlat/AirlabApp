import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css'],
})
export class SessionTimeoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  refreshPage() {
    this.router.navigate(['/flight']);
    // window.location.reload();
  }
}
