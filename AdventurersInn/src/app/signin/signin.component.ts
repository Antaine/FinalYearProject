import { Component, OnInit } from '@angular/core';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    public ngAuthService: FireAuthenticationService
  ) { }

  ngOnInit() { }
}