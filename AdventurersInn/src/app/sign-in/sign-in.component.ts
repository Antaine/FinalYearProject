import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
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

  async onSignIn(email:string,password:string){
    await this.crudService.signIn(email,password)
    if(this.crudService.isLoggedIn)
    this.isSignedIn = true
  }

  handleLogOut(){
    this.isSignedIn = false
  }

}