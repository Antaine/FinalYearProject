import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {
  isSignedIn = false
  constructor(
    public crudService: CrudService) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false 
  }

  async onSignUp(email:string,password:string){
    await this.crudService.signUp(email,password)
    if(this.crudService.isLoggedIn)
    this.isSignedIn = true
  }

  handleLogOut(){
    this.isSignedIn = false
    
  }

}
