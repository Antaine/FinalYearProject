import { Component, OnInit} from '@angular/core';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
 // Variables
  users: any;
  userLevel: number;
  userCharacter: string;
  user: any; 
  forums: any;
  postContent: string;
  postName: string;

  //Import Crud Service
  constructor(public crudService: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService) { }

  ngOnInit(): void {
    //Initialize
    
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

  //Create Post Method
  CreatePost(postData:{postName: string; postContent: string}) {
    console.log(postData);
    let record = {};
    record['PostName'] = this.ngAuthService.userState.email;
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
    console.log("RemovePost: "+rowID);
    this.crudService.delete_Post(rowID);
  }
  
  //Update Record
  EditPost(record) {
    console.log("EditPost: "+record.toString());
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
