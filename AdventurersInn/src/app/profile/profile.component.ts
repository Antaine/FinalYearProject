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
  users: any;
  email: string;

  constructor(public crudService: CrudService,
    private router: Router) { }

  ngOnInit(): void {
    //Initialize
    this.crudService.read_Characters().subscribe(data => {
      //User Table
      this.users = data.map(e => {
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

  create(){
    this.router.navigate(['/createcharacter'])
  }

  //Delete from Database
  RemoveRecord(rowID) {
    this.crudService.delete_User(rowID);
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
    this.crudService.update_User(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
