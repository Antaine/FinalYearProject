import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isSignedIn = false

  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
  }

  async onSignUp(email:string,password:string){
    await this.crudService.signUp(email,password)
    if(this.crudService.isLoggedIn)
    this.isSignedIn = true
  }

}
