import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

   // Variables
   users: any;
   user: any; 
   messages: any;
   messageContent: string;
   friendId: string;
   friendName: string;

   constructor(
    
    public crudService: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  //Initialize
    this.crudService.read_Groups().subscribe(data => {
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
  this.crudService.post_Group(record).then(resp => {
    this.friendId = "";
    this.messageContent = "";
    console.log(resp);
  })
  .catch(error => {
    console.log(error);
  });

}

GetChat(message){
  console.log("Entered");
  localStorage.setItem('groupState', JSON.stringify(message));
  console.log(message);
  this.router.navigate(['/group'])
}
}



