import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public crudService: CrudService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(){
    this.router.navigate(['/createcharacter'])
  }
}
