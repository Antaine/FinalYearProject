import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from "../services/fire-authentication.service";


@Injectable({
  providedIn: 'root'
})
export class CrudService{
  constructor(
    private firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
  ) { }

}