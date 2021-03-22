import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  //Variables
  users: any;
  userName: string;
  user: any; 
  userLevel: number;
  userCharacter: string;

  constructor(
    //CRUD Service Import
    public crudService: FireAuthenticationService,
    private router: Router,
    public ngAuthService: FireAuthenticationService) { }

  ngOnInit() {
    //Initialize
    this.user = this.ngAuthService.userState;
    this.userName = this.ngAuthService.userState.email;
    this.crudService.read_Users().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Level: e.payload.doc.data()['Level'],
          Character: e.payload.doc.data()['Character'],
        };
      })
    });
  }

  //Navigate back to My Profile Page
  back(){
    this.router.navigate(['/profile'])
  }

  //Create Character Method
  CreateRecord() {
    let record = {};
    record['Name'] = this.userName;
    record['Level'] = this.userLevel;
    record['Character'] = this.userCharacter;
    
    this.crudService.create_NewCharacter(record).then(resp => {
      this.userName = this.userName;
      this.userLevel = undefined;
      this.userCharacter = "";
      console.log(resp);
      this.router.navigate(['/profile'])
    })
      .catch(error => {
       console.log(error);
      });
  }
}