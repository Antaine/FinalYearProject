import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crudservice';

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
  postContent: string;
  class

  classes = ["Artificer", "Barbarian", "Bard", "Cleric","Druid"];

  constructor(public crudService: CrudService,
    private router: Router) { }

  ngOnInit(): void {
    //Initialize
    this.crudService.read_Characters().subscribe(data => {
      //User Table
      this.characters = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Level: e.payload.doc.data()['Level'],
          Character: e.payload.doc.data()['Character'],
        };
      })
    })
    if(localStorage.getItem('user') !== null){
      this.email = localStorage.getItem('uEmail');}
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

  create(){
    this.router.navigate(['/createcharacter'])
  }

  message(){
    this.router.navigate(['/messaging'])
  }

  //Delete from Database
  RemoveRecord(rowID) {
    this.crudService.delete_Character(rowID);
  }

  //Update Record
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditLevel = record.Level;
    record.EditCharacter = record.Character;
  }

  //Push Record
  UpdateRecord(recordRow) {
    let record = {};
    record['Character'] = recordRow.EditCharacter;
    record['Level'] = recordRow.EditLevel;
    this.crudService.update_Character(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
