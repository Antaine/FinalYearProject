import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  //Variables
  title = 'Firestore CRUD Operations Users App';
  users: any;
  userName: string = localStorage.getItem('uEmail');
  userLevel: number;
  userCharacter: string;

  constructor(
    //CRUD Service Import
    public crudService: CrudService,
    private router: Router) { }

  ngOnInit() {
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
  //Create Character Method
  CreateRecord() {
    let record = {};
    record['Name'] = this.userName;
    record['Level'] = this.userLevel;
    record['Character'] = this.userCharacter;
    
    this.crudService.create_NewCharacter(record).then(resp => {
      this.userName = this.userName;
      this.userLevel = undefined;
      this.userCharacter = "";
      console.log(resp);
      this.router.navigate(['/profile'])
    })
      .catch(error => {
       console.log(error);
      });
  }
}