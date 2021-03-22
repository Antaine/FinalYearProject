import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";


export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class FireAuthenticationService {
    userState: any;

    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }
  
    SignIn(email, password) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  
    SignUp(email, password) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['email-verification']);
        })
    }    
  
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }
  
    AuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
         this.ngZone.run(() => {
            this.router.navigate(['']);
          })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
    }  

    
   //Create User
   create_CharacterCollection(record) {
     
    console.log("Create Email: "+ this.userState.uid);
    return this.afs.collection('users').doc(this.userState.uid).collection("Characters").add;

    //return this.firestore.collection('Users').doc(this.testEmail).collection("Characters").add;
  }

  //Create Character
  create_NewCharacter(record) {
      console.log("New Character "+ this.userState.uid);
      return this.afs.collection('users').doc(this.userState.uid).collection("Characters").add(record);
    }
    
  //Read User
  read_Users() {
    return this.afs.collection('users').snapshotChanges();
  }
  //Read Characters
  read_Characters() {
    return this.afs.collection('users').doc(JSON.parse(localStorage.getItem('user'))).collection("Characters").snapshotChanges();
    JSON.parse(localStorage.getItem('user'));
  }
  //Update User
  update_User(recordID,record){
    this.afs.doc('users/' + recordID).update(record);
  }

  update_Character(recordID,record){
    this.afs.collection('users').doc(this.userState.uid).collection("Characters").doc(recordID).update(record);
  }
  //Delete User
  delete_User(record_id) {
    this.afs.doc('users/' + record_id).delete();
  }

  delete_Character(recordID){
    this.afs.doc('users/'+this.userState.uid+'/Characters/'+recordID).delete();
  }

  //Create Post
  post_Forum(record) {
    return this.afs.collection('Forums').add(record);
  }

  //Read Posts
  read_Forums() {
    return this.afs.collection('Forums').snapshotChanges();
  }

  //Delete User
  delete_Post(record_id) {
    console.log("Delete Post: " + record_id);
    this.afs.doc('Forums/' + record_id).delete();
  }

  //Update User
  edit_Post(recordID,record){
    this.afs.doc('Forums/' + recordID).update(record);
  }
}