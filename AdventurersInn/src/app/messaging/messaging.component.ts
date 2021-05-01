import { Component, OnInit} from '@angular/core';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
 // Variables
  users: any;
  user: any; 
  messages: any;
  messageContent: string;
  messageName: string;

  //Import Crud Service
  constructor(public crudService: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService) { }

  ngOnInit(): void {
    //Initialize
    this.crudService.read_Messages().subscribe(data => {
          //Fourm Table
          this.messages = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              MessageName: e.payload.doc.data()['MessageName'],
              MessageContent: e.payload.doc.data()['MessageContent'],
            };
          })
        });
  }

  //Create Post Method
  CreateMessage(postData:{postName: string; postContent: string}) {
    //console.log(postData);
    let record = {};
    record['MessageName'] = this.messageName;
    record['MessageContent'] = this.messageContent;
    this.crudService.post_Message(record).then(resp => {
      this.messageName = "";
      this.messageContent = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });

  }

  //Delete from Database
  RemoveMessage(rowID) {
    this.crudService.delete_Message(rowID);
  }
  
  //Update Record
  EditMessage(record) {
    record.isEdit = true;
    record.EditPost = record.MessageContent;
    record.EditName = record.MessageName;
  }

  //Push Record
  UpdateMessage(recordRow) {
    let record = {};
    record['MessageContent'] = recordRow.MessageContent;
    record['MessageName'] = recordRow.MessageName;
    this.crudService.edit_Message(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
