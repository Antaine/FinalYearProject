import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//Initialize
  isSignedIn = false

  constructor(public crudService: CrudService,
    private router: Router,
    private app: AppComponent) { }

  ngOnInit(): void {
  }

  //Sign Up Method
  async onSignUp(email:string,password:string){
    await this.crudService.signUp(email,password)
    if(this.crudService.isLoggedIn)
    this.isSignedIn = true
    this.app.checkLogIn()
    this.router.navigate(['/home'])
  }

}
