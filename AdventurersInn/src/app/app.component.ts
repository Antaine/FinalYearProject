import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudService } from './services/crudservice';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FireAuthenticationService } from "./services/fire-authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  private isSignedIn = false;
  constructor( 
    public crudService: CrudService,
    public fireService: FireAuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.isSignedIn = this.fireService.isLoggedIn;
  } 
}
