import { Component, OnInit} from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 // Variables
  users: any;
  userName: string;
  userLevel: number;
  userCharacter: string;

  //Import Crud Service
  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    //Initialize
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
    record['Name'] = recordRow.EditName;
    record['Level'] = recordRow.EditLevel;
    record['Character'] = recordRow.EditCharacter;
    this.crudService.update_User(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
