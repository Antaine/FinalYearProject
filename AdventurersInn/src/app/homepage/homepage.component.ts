import { Component, OnInit } from '@angular/core';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public ngAuthService: FireAuthenticationService) { }

  ngOnInit(): void {
  }

}