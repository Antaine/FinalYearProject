import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
const routes: Routes = [
  { path: 'signup', component: CreateNewUserComponent },
  { path: 'home', component: HomepageComponent },
  { path: '', component: HomepageComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'createcharacter', component: CreateCharacterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
