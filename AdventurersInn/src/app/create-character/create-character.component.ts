import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  title = 'Firestore CRUD Operations Users App';

  isSignedIn = false

  users: any;
  userName: string;
  userLevel: number;
  userCharacter: string;

  constructor(
    public crudService: CrudService) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false 
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

  handleLogOut(){
    this.isSignedIn = false
    
  }

  CreateRecord() {
    let record = {};
    record['Name'] = this.userName;
    record['Level'] = this.userLevel;
    record['Character'] = this.userCharacter;
    this.crudService.create_NewUser(record).then(resp => {
      this.userName = "";
      this.userLevel = undefined;
      this.userCharacter = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

}