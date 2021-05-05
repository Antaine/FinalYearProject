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
  users: any;
  userLevel: number;
  userCharacter: string;
  user: any; 
  comments: any;
  postContent: string;
  postTitle: string;
  postAuthor: string;
  postName: string;
  constructor(public afs: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService) { }

  ngOnInit(): void {
    const post = JSON.parse(localStorage.getItem('postState'));
    this.postTitle = post.PostTitle;
    this.postContent = post.PostContent;
    this.postName = post.PostName;
    console.log(post);
    this.afs.read_Post(post).subscribe(data => {
      //Fourm Table
      this.comments = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          PostId: e.payload.doc.data()['PostName'],
          PostContent: e.payload.doc.data()['PostContent'],
          Author: e.payload.doc.data()['Author'],
        };
      })
    });
  }
 /* //Create Post Method
  CreatePost(postData:{postName: string; postContent: string; author: string}) {
    let record = {};
    record['PostName'] = this.ngAuthService.userState.displayName;
    record['PostContent'] = this.postContent;
    record['Author'] = this.ngAuthService.userState.uid;
    this.crudService.post_Forum(record).then(resp => {
      this.postName = "";
      this.postContent = "";
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




  

  


