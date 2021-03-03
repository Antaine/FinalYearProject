import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService{

  //Not logged in by default
  isLoggedIn = false;
  testEmail = localStorage.getItem('uEmail');
  //email = localStorage.getItem('uEmail');

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
      localStorage.setItem('user',JSON.stringify(res.user));
      localStorage.setItem('uId',JSON.stringify(res.user.uid));
      localStorage.setItem('uEmail',JSON.stringify(res.user.email));
      this.testEmail = localStorage.getItem('uEmail');
      console.log("Sign In Email: "+ email);
    })
  }

  //Sign up Methods
  async signUp(email: string, password : string){
    await this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
      localStorage.setItem('uId',JSON.stringify(res.user.uid));
      localStorage.setItem('uEmail',JSON.stringify(res.user.email));
      this.testEmail = localStorage.getItem('uEmail');
      console.log("Sign Up Email: "+ this.testEmail);
    })
  }
  
  //Log Out
  logOut(){
    this.fireAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('uId');
    console.log(" Delete Email: "+ this.testEmail);
    this.testEmail ="";
    localStorage.removeItem('uEmail');
    console.log("Deleted Email: "+ this.testEmail);
  }

  //Create User
  create_NewUser(record) {
    console.log("Create Email: "+ this.testEmail);
    return this.firestore.collection('Users').doc(this.testEmail).set({});
  }

   //Create User
   create_CharacterCollection(record) {
    console.log("Create Email: "+ this.testEmail);
    return this.firestore.collection('users').doc(this.testEmail).collection("Characters").add;

    //return this.firestore.collection('Users').doc(this.testEmail).collection("Characters").add;
  }

  //Create Character
  create_NewCharacter(record) {
      console.log("New Character "+ this.testEmail);
      return this.firestore.collection('Users').doc(this.testEmail).collection("Characters").add(record);
    }
    
  //Read User
  read_Users() {
    return this.firestore.collection('Users').snapshotChanges();
  }
  //Read Characters
  read_Characters() {
    return this.firestore.collection('Users').doc(this.testEmail).collection("Characters").snapshotChanges();
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