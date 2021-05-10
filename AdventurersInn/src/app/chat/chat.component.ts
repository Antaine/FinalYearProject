import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: any; 
  messages: any;
  messageContent: string;
  messageName: string;
  friendName: string;
  uId: string;
  
  constructor(public afs: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService,
    public cs: AngularFirestore) { }


  ngOnInit(): void {
    
    this.afs.readChat().subscribe(data => {
   
      //Fourm Table
      this.messages = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          chatId: e.payload.doc.data()['chatId'],
          createdAt: e.payload.doc.data()['createdAt'],
          uid: e.payload.doc.data()['friendId'],
          messageContent: e.payload.doc.data()['messageContent'],
          sender: e.payload.doc.data()['sender'],
          
        };
        
      })
     
    });
  }

  ReplyMessage(message){
    console.log(message);
    const messageInfo = JSON.parse(localStorage.getItem('chatState'));
    let record = {};
    record['chatId'] = messageInfo.chatId;
    record['friendId'] = messageInfo.friendId;
    record['messageContent'] = message;
    record['sender'] = this.afs.userState.displayName;
    //Get Current Time
    let dateTime = new Date()
    var time = dateTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    record['createdAt'] = time;
    console.log(record);
    this.afs.friendUpdateTarget(record,messageInfo.friendId,messageInfo.chatId);
    return this.cs.collection('Messaging').doc(messageInfo.chatId).collection("Messages").add(record);
  }

}





  

  


