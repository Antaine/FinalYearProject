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
  //Initiallize
  title = 'Firestore CRUD Operations Users App';
 // isSignedIn = false
  
  //UserEmail = localStorage.getItem('uEmail');

  //@Output() isLogOut = new EventEmitter<void>()
  constructor( 
    public crudService: CrudService,
    public fireService: FireAuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
  } 

 /* redirect(): boolean {
    if (this.crudService.isLoggedIn) {
      return true
    } else {
      this.router.navigate(['/sign-in'])
      return false
    }
  }*/
}
