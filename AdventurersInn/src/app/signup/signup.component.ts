import { Component, OnInit } from '@angular/core';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(public ngAuthService: FireAuthenticationService) { }

  ngOnInit(): void {
  }
}