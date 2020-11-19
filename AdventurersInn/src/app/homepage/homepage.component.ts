import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CrudService } from '../services/crudservice';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @Output() isLogOut = new EventEmitter<void>()
  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
  }
  logOut(){
    this.crudService.logOut()
    this.isLogOut.emit()
  }
}
