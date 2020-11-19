import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CrudService{

  isLoggedIn = false

  constructor(
    private firestore: AngularFirestore,
    public fireAuth: AngularFireAuth
  ) { }

  async signIn(email: string, password : string){
    await this.fireAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  async signUp(email: string, password : string){
    await this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  logOut(){
    this.fireAuth.signOut()
    localStorage.removeItem('user')
  }

  create_NewUser(record) {
    return this.firestore.collection('Users').add(record);
  }

  read_Users() {
    return this.firestore.collection('Users').snapshotChanges();
  }

  update_User(recordID,record){
    this.firestore.doc('Users/' + recordID).update(record);
  }

  delete_User(record_id) {
    this.firestore.doc('Users/' + record_id).delete();
  }
}