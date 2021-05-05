import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // Variables
  user: any; 
  comments: any;
  postContent: string;
  postTitle: string;
  postAuthor: string;
  postName: string;
  commentContent: string;
  commentAuthor: string;
  postId: string;
  constructor(public afs: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService) { }

  ngOnInit(): void {
    const post = JSON.parse(localStorage.getItem('postState'));
    this.postTitle = post.PostTitle;
    this.postContent = post.PostContent;
    this.postName = post.PostName;
    this.postAuthor = post.Author;
    this.postId = post.id;
    console.log(post);
    this.afs.read_Post().subscribe(data => {
      //Fourm Table
      this.comments = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          
          CommentContent: e.payload.doc.data()['commentContent'],
          CommentId: e.payload.doc.data()['commentAuthorId'],
          CommentName: e.payload.doc.data()['commentAuthor'],
          CreatedAt: e.payload.doc.data()['createdAt'],
        };
        
      })
      
    });
  }
  //Create Post Method
  CreateComment(recordContent) {
    let record = {};
    console.log('Entered create')
    record['commentContent'] = recordContent['postContent'];
    record['target'] = this.postAuthor + this.postId;
    record['commentAuthor'] = this.ngAuthService.userState.displayName;
    record['commentAuthorId'] = this.ngAuthService.userState.uid;
    record['createdAt']=new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    console.log(record.toString());
    this.afs.postComment(record).then(resp => {
      this.postName = "";
      this.postContent = "";
    })
      .catch(error => {
        console.log(error);
      });
  }

 /* //Delete from Database
  RemovePost(rowID) {
    this.crudService.delete_Post(rowID);
  }
  
  //Update Record
  EditPost(record) {
    if(record.Author == this.ngAuthService.userState.uid){
      record.isEdit = true;
      record.EditPost = record.PostContent;
      record.EditName = record.PostName;
    }
    else{
      console.log("Only the author may edit this post");
    }

  }

  //Push Record
  UpdatePost(recordRow) {
    let record = {};
    record['PostContent'] = recordRow.PostContent;
    record['PostName'] = recordRow.PostName;
    this.crudService.edit_Post(recordRow.id, record);
    recordRow.isEdit = false;
  }*/

}




  

  


