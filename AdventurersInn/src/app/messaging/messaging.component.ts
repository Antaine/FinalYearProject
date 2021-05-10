import { Component, OnInit} from '@angular/core';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";
import { Router } from '@angular/router';

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
  friendId: string;
  friendName: string;

  //Import Crud Service
  constructor(
    
    public crudService: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    //Initialize
    this.crudService.read_Messages().subscribe(data => {
          //Fourm Table
          this.messages = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              friendName: e.payload.doc.data()['friendName'],
              MessageContent: e.payload.doc.data()['message'],
              CreatedAt: e.payload.doc.data()['createdAt'],
              friendId: e.payload.doc.data()['friendId'],
              chatId: e.payload.doc.data()['chatId']
            };
          })
        });
  }

  //Create Post Method
  CreateMessage(postData:{postName: string; postContent: string;}) {
    //console.log(postData);
    let record = {};
    record['friendId'] = this.friendId;
    record['messageContent'] = this.messageContent;
    console.log(record);
    this.crudService.post_Message(record).then(resp => {
      this.friendId = "";
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
    record.EditName = record.friendId;
  }

  //Push Record
  UpdateMessage(recordRow) {
    let record = {};
    record['messageContent'] = recordRow.MessageContent;
    record['friendId'] = recordRow.friendId;
    this.crudService.edit_Message(recordRow.id, record);
    recordRow.isEdit = false;
  }

  GetChat(message){
    console.log("Entered");
    localStorage.setItem('chatState', JSON.stringify(message));
    console.log(message);
    this.router.navigate(['/chat'])
  }

}
