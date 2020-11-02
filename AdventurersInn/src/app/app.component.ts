import { Component, OnInit } from '@angular/core';

import { CrudService } from './services/crudservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Firestore CRUD Operations Users App';

  users: any;
  userName: string;
  userLevel: number;
  userCharacter: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
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
      console.log(this.users);

    });
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

  RemoveRecord(rowID) {
    this.crudService.delete_User(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditLevel = record.Level;
    record.EditCharacter = record.Character;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Level'] = recordRow.EditLevel;
    record['Character'] = recordRow.EditCharacter;
    this.crudService.update_User(recordRow.id, record);
    recordRow.isEdit = false;
  }

}