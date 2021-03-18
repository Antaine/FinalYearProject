import { Component, OnInit} from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 // Variables
  users: any;
  userName: string;
  userLevel: number;
  userCharacter: string;
  email: string;

  forums: any;
  postContent: string;
  postName: string;

  //Import Crud Service
  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
  }
}
