import { Component, OnInit } from '@angular/core';

import { CrudService } from './services/crudservice';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSidenavModule } from  '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Firestore CRUD Operations Users App';

  isSignedIn = false

  constructor(
    public crudService: CrudService) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false 
  }

}
