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
  email: string;

  forums: any;
  postContent: string;
  postName: string;

  //Import Crud Service
  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    //Initialize
    this.crudService.read_Users().subscribe(data => {
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

    this.crudService.read_Forums().subscribe(data => {
          //Fourm Table
          this.forums = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              PostName: e.payload.doc.data()['PostName'],
              PostContent: e.payload.doc.data()['PostContent'],
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
    record['Character'] = recordRow.EditCharacter;
    record['Level'] = recordRow.EditLevel;
    this.crudService.update_User(recordRow.id, record);
    recordRow.isEdit = false;
  }

    //Create Post Method
    CreatePost(postData:{postName: string; postContent: string}) {
      console.log(postData);
     let record = {};
      record['PostName'] =this.email;
      record['PostContent'] = this.postContent;
      this.crudService.post_Forum(record).then(resp => {
        this.postName = "";
        this.postContent = "";
        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        });
    }

  //Delete from Database
  RemovePost(rowID) {
    this.crudService.delete_Post(rowID);
  }
//Update Record
  EditPost(record) {
    record.isEdit = true;
    record.EditPost = record.PostContent;
    record.EditName = record.PostName;
  }
  //Push Record
  UpdatePost(recordRow) {
    let record = {};
    record['PostContent'] = recordRow.PostContent;
    record['PostName'] = recordRow.PostName;
    console.log(recordRow.EditPost);
    this.crudService.edit_Post(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
