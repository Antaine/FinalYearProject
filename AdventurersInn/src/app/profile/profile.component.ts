import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Variables
  characters: any;
  email: string;
  userName: string;
  userLevel: number;
  userCharacter: string;
  userRace: string;
  userBackground: string;
  userClass: string;
  postContent: string;

  constructor(public afs:FireAuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    //Initialize
    this.afs.read_Characters().subscribe(data => {
      //User Table
      this.characters = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Level: e.payload.doc.data()['level'],
          Character: e.payload.doc.data()['character'],
          Race: e.payload.doc.data()['race'],
          Background: e.payload.doc.data()['background'],
          Class: e.payload.doc.data()['class'],

        };
      })
    })
  }

  //Create Character Method
  CreateRecord() {
    let record = {};
    record['Name'] = this.userName;
    record['Level'] = this.userLevel;
    record['Character'] = this.userCharacter;
    record['Race'] = this.userRace;
    record['Background'] = this.userBackground;
    record['Class'] = this.userClass;
    
    this.afs.create_NewCharacter(record).then(resp => {
      this.userName = this.userName;
      this.userLevel = undefined;
      this.userCharacter = "";
      this.userRace = "";
      this.userBackground = "";
      this.userClass = "";
      console.log(resp);
      this.router.navigate(['/profile'])
    })
      .catch(error => {
       console.log(error);
      });
  }

  create(){
    this.router.navigate(['/createcharacter'])
  }

  message(){
    this.router.navigate(['/messaging'])
  }

  //Delete from Database
  RemoveRecord(rowID) {
    this.afs.delete_Character(rowID);
  }
  
  //Update Record
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditLevel = record.Level;
    record.EditCharacter = record.Character;
    record.EditRace = record.Race;
    record.EditBackground = record.Background;
    record.EditClass = record.Class;
  }
  
  //Push Record
  UpdateRecord(recordRow) {
    let record = {};
    record['character'] = recordRow.EditCharacter;
    record['level'] = recordRow.EditLevel;
    record['race'] = recordRow.EditRace;
    record['background'] = recordRow.EditBackground;
    record['class'] = recordRow.EditClass;
    this.afs.update_Character(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
