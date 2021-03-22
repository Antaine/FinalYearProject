import { Component, OnInit } from '@angular/core';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public ngAuthService: FireAuthenticationService) { }

  ngOnInit(): void {
  }

}