
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudService } from './services/crudservice';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Firestore CRUD Operations Users App';

  isSignedIn = false

  @Output() isLogOut = new EventEmitter<void>()
  constructor(
    public crudService: CrudService) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false 
  }

  logOut(){
    this.crudService.logOut()
    this.isLogOut.emit()
    this.isSignedIn = false
  }
}
