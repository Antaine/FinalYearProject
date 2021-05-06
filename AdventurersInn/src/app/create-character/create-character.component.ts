import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crudservice';
import { FireAuthenticationService } from "../services/fire-authentication.service";

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  //Variables
  levels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Tiefling'];
  classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
  backgrounds = ['Acolyte', 'Criminal', 'Entertainer', 'Folk Hero', 'Hermit', 'Noble', 'Outlander', 'Sailor', 'Soldier', 'Urchin'];

  users: any;
  userName: string;
  user: any; 
  userCharacter: string;
  userLevel: string = 'Level 1';
  userRace: string;
  userClass: string;
  userBackground: string;

  constructor(
    //Service Imports
    public crudService: FireAuthenticationService,
    private router: Router,
    public ngAuthService: FireAuthenticationService) { }

  ngOnInit() {
    //Get User Data
    this.user = this.ngAuthService.userState;
    this.userName = this.ngAuthService.userState.email;
    //Get firebase Info
    this.crudService.read_Users().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['name'],
          Level: e.payload.doc.data()['level'],
          Character: e.payload.doc.data()['character'],
          Race: e.payload.doc.data()['race'],
          Class: e.payload.doc.data()['class'],
          Background: e.payload.doc.data()['background'],
        };
      })
    });
  }

  //Navigate back to My Profile Page
  back(){
    this.router.navigate(['/profile'])
  }

  //Create Character Method
  CreateRecord() {
    let record = {};
    record['name'] = this.userName;
    record['level'] = this.userLevel;
    record['character'] = this.userCharacter;
    record['race'] = this.userRace;
    record['class'] = this.userClass;
    record['background'] = this.userBackground;
    
    this.crudService.create_NewCharacter(record).then(resp => {
      this.userName = this.userName;
      this.userLevel = undefined;
      this.userCharacter = "";
      this.userRace = "";
      this.userClass = "";
      this.userBackground = "";
      console.log(resp);
      this.router.navigate(['/profile'])
    })
      .catch(error => {
       console.log(error);
      });
  }
}