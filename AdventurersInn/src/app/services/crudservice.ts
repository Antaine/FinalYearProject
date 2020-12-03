import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService{

  //Not logged in by default
  isLoggedIn = false

  //Authentication & Firestore
  constructor(
    private firestore: AngularFirestore,
    public fireAuth: AngularFireAuth
  ) { }

  //Sign In Method
  async signIn(email: string, password : string){
    await this.fireAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  //Sign up Methods
  async signUp(email: string, password : string){
    await this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  
  //Log Out
  logOut(){
    this.fireAuth.signOut()
    localStorage.removeItem('user')
  }

  //Create User
  create_NewUser(record) {
    return this.firestore.collection('Users').add(record);
  }
  //Read User
  read_Users() {
    return this.firestore.collection('Users').snapshotChanges();
  }
  //Update User
  update_User(recordID,record){
    this.firestore.doc('Users/' + recordID).update(record);
  }
  //Delete User
  delete_User(record_id) {
    this.firestore.doc('Users/' + record_id).delete();
  }

  //Create Post
  post_Forum(record) {
    return this.firestore.collection('Forums').add(record);
  }

  //Read Posts
  read_Forums() {
    return this.firestore.collection('Forums').snapshotChanges();
  }

  //Delete User
  delete_Post(record_id) {
     this.firestore.doc('Forums/' + record_id).delete();
  }

  //Update User
  edit_Post(recordID,record){
    this.firestore.doc('Forums/' + recordID).update(record);
  }
}