import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudService } from './services/crudservice';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  //Initiallize
  title = 'Firestore CRUD Operations Users App';
  isSignedIn = false
  
  //UserEmail = localStorage.getItem('uEmail');

  //@Output() isLogOut = new EventEmitter<void>()
  constructor( 
    public crudService: CrudService,
    private router: Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null)
    { this.isSignedIn = true
      console.log(localStorage.getItem('uId'));
      console.log(localStorage.getItem('uEmail'));}
    else
    this.isSignedIn = false 
  }

  redirect(): boolean {
    if (this.crudService.isLoggedIn) {
      return true
    } else {
      this.router.navigate(['/signin'])
      return false
    }
  }

  //Log Out
  logOut(){
    this.crudService.logOut()
    //this.isLogOut.emit()
    this.isSignedIn = false
  }

  checkLogIn() {
    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false 
  }
}
