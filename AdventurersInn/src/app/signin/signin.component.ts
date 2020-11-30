import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isSignedIn = false;

  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
  }

  async onSignIn(email:string,password:string){
    await this.crudService.signIn(email,password)
    if(this.crudService.isLoggedIn)
    this.isSignedIn = true
  }

}
