import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  public ngAuthService: FireAuthenticationService,
  public afs: AngularFirestore) { }

ngOnInit(): void {
  //Get User Data
  this.user = this.ngAuthService.userState;
  //Get firebase Info
  this.ngAuthService.read_Users().subscribe(data => {
    this.users = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        Name: e.payload.doc.data()['displayName'],
      };
    })
  });
}

 //Create Character Method
 async CreateUserName() {
  let record = {};
  record['displayName'] = this.displayName;
  this.ngAuthService.create_Username(record);
  console.log(record);
  }
}