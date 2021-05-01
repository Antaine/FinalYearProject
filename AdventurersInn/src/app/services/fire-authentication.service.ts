import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

//User Object
export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class FireAuthenticationService {
    userState: any;
    public logState: boolean; 

    constructor(
      //Imports
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
    ) {
      //Get User Data
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
  //Sign In Method
    SignIn(email, password) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
          console.log(result.user.displayName);
          this.SetUserData(result.user);
          
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  //Sign Up
    SignUp(email, password) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
          console.log(result.user.uid);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    register(email:string, password: string, fullname:string){
      return new Promise((resolve, reject) => {
        this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          userData.user.updateProfile({
            displayName: fullname,
            photoURL: ''
          }).then(() => {
            this.SetUserData(userData.user);
            resolve(userData);
          }); 
        },
        err => reject(err))
      });
    }






  //Email Verification
    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u.sendEmailVerification())
        /*.then(() => {
          this.router.navigate(['email-verification']);
        })*/
    }    
  //Password Recovery
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  //Log In
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      this.logState = (user !== null /*&& user.emailVerified !== false*/) ? true : false;
      return (user !== null /*&& user.emailVerified !== false*/) ? true : false;
    }
  //Authentication
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
  //Store User Data
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
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

    //Create Character
    async create_Username(record) {return this.afs.collection('users').doc(this.userState.uid).update(record);}

    
   //Create Character Collection
   create_CharacterCollection(record) {return this.afs.collection('users').doc(this.userState.uid).collection("Characters").add;}

  //Create Character
  create_NewCharacter(record) {return this.afs.collection('users').doc(this.userState.uid).collection("Characters").add(record);}
  
  //Read Users
  read_Users() {return this.afs.collection('users').snapshotChanges();}

  //Read Characters
  read_Characters() {return this.afs.collection('users').doc(this.userState.uid).collection("Characters").snapshotChanges();}

  //Update User
  update_User(recordID,record){this.afs.doc('users/' + recordID).update(record);}

  //Update Character
  update_Character(recordID,record){this.afs.collection('users').doc(this.userState.uid).collection("Characters").doc(recordID).update(record);}

  //Delete User
  delete_User(record_id) {this.afs.doc('users/' + record_id).delete();}

  //Delete Character
  delete_Character(recordID){this.afs.doc('users/'+this.userState.uid+'/Characters/'+recordID).delete();}

  //Create Post
  post_Forum(record) {return this.afs.collection('Forums').add(record);}

  //Read Posts
  read_Forums() {return this.afs.collection('Forums').snapshotChanges();}

  //Delete Post
  delete_Post(record_id) {this.afs.doc('Forums/' + record_id).delete();}

  //Update User
  edit_Post(recordID,record){this.afs.doc('Forums/' + recordID).update(record);}

  //Create Message
  post_Message(record) {
    record['sender'] = this.userState.uid;
    let dateTime = new Date()
    var time = dateTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});;
    record['createdAt'] = time;
    var target = record['MessageName'];
    record['chatId'] = this.userState.uid + target;
    var chatId = this.userState.uid + target;
    this.friendUpdateSender(record,target, chatId);
    this.friendUpdateTarget(record, target, chatId);
    return this.afs.collection('Messaging').doc(chatId).collection("Messages").add(record);
    //return this.afs.collection('Messaging').doc(this.userState.uid+).collection("Friends").doc(target).set(data);
  }
  friendUpdateSender(record, target, chatId) {
    const data = {
      friend: record['MessageName'],
      message:  record['MessageContent'],
      createdAt: record['createdAt'],
      chatId: chatId
    };
    
    return this.afs.collection('users').doc(this.userState.uid).collection("Friends").doc(target).set(data);

  }
  friendUpdateTarget(record, target, chatId) {
    const data2 = {
      friend: this.userState.uid,
      message:  record['MessageContent'],
      createdAt: record['createdAt'],
      chatId: chatId
    };
    console.log("2nd Update" + target);
    
    return this.afs.collection('users').doc(target).collection("Friends").doc(this.userState.uid).set(data2);
  }

  //Read Posts
  read_Messages() {return this.afs.collection('users').doc(this.userState.uid).collection("Friends").snapshotChanges();}
  //Delete Message
  delete_Message(record_id) {this.afs.doc('users/' + this.userState.uid+'/Messaging/'+record_id).delete();}
  //Update Message
  edit_Message(recordID,record){this.afs.collection('users').doc(this.userState.uid).collection("Messaging").doc(recordID).update(record);}

  
}