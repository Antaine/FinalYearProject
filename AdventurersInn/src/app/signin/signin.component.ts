import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

//Signed in false by default
  isSignedIn = false;

  constructor(public crudService: CrudService,
    private router: Router,
    private app: AppComponent) { }

  ngOnInit(): void {
  }

  //Signed In
  async onSignIn(email:string,password:string){
    await this.crudService.signIn(email,password)
    if(this.crudService.isLoggedIn)
    this.isSignedIn = true
    this.app.checkLogIn()
    this.router.navigate(['/home'])
  }

}
