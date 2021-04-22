import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthenticationService } from '../services/fire-authentication.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
//Variables
users: any;
displayName: string;
user: any; 

constructor(
  //Service Imports
  private router: Router,
  public ngAuthService: FireAuthenticationService) { }

ngOnInit(): void {
  //Get User Data
  this.user = this.ngAuthService.userState;
  //Get firebase Info
  this.ngAuthService.read_Users().subscribe(data => {
    this.users = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        Name: e.payload.doc.data()['Username'],
      };
    })
  });
}

 //Create Character Method
 async CreateUserName() {
  let record = {};
  record['Username'] = this.displayName;
  
  this.ngAuthService.create_Username(record).then(resp => {
    this.displayName = this.displayName;
    console.log(resp);
  })
    .catch(error => {
     console.log(error);
    });
}
}