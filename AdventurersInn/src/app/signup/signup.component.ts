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
  users: any;
  userEmail: string;
  userName: string;
  constructor(public crudService: CrudService,
    private router: Router,
    private app: AppComponent) { }

  ngOnInit(): void {
    this.crudService.read_Users().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Email: e.payload.doc.data()['Email'],
        };
      })
    });
  }

  //Sign Up Method
  async onSignUp(email:string,password:string){
    await this.crudService.signUp(email,password)
    if(this.crudService.isLoggedIn)
    this.userEmail = email;
    this.CreateUser();
    this.isSignedIn = true
    this.app.checkLogIn()
    this.router.navigate(['/home'])
  }

  CreateUser() {
    let record = {};
    record['Email'] = this.userEmail;
    console.log("Sign Up Email: "+ this.userEmail);
    this.crudService.create_NewUser(record).then(resp => {
      this.userEmail = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

}
