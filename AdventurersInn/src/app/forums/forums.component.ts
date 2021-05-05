import { Component, OnInit} from '@angular/core';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";
import { Router } from '@angular/router';

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
  postTitle: string;
  postId: string;

  //Import Crud Service
  constructor(public crudService: FireAuthenticationService,
    public ngAuthService: FireAuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    //Initialize
    
    this.crudService.read_Forums().subscribe(data => {
          //Fourm Table
          this.forums = data.map(e => {
            return {
              id: e.payload.doc.id,
              isEdit: false,
              PostTitle: e.payload.doc.data()['PostTitle'],
              PostName: e.payload.doc.data()['PostName'],
              PostContent: e.payload.doc.data()['PostContent'],
              Author: e.payload.doc.data()['Author'],
            };
          })
        });
  }

  //Create Post Method
  CreatePost(postData:{postTitle: string;postName: string; postContent: string; author: string}) {
    let record = {};
    record['PostTitle'] = this.postTitle;
    record['PostName'] = this.ngAuthService.userState.displayName;
    record['PostContent'] = this.postContent;
    record['Author'] = this.ngAuthService.userState.uid;
    record['postId'] = this.ngAuthService.userState.uid +  this.postTitle;;
   // record['PostId'] = this.ngAuthService.userState.uid ;
    this.crudService.post_Forum(record).then(resp => {
      this.postName = "";
      this.postContent = "";
    })
      .catch(error => {
        console.log(error);
      });
  }

  //Delete from Database
  RemovePost(record,rowID) {
    if(record.Author == this.ngAuthService.userState.uid){
      this.crudService.delete_Post(rowID);
    }
    else{
      console.log(record.Author);
      console.log("Only the author may delete this post");
    }
   
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
  }

  GetPost(post){
    console.log("Entered");
    localStorage.setItem('postState', JSON.stringify(post));
    console.log(post);
    this.router.navigate(['/post'])
  }

}
