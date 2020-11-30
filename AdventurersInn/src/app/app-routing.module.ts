import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Import pages to create route
import { CreateCharacterComponent } from './create-character/create-character.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

//Routes to Navigate to Pages
const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: '', component: HomepageComponent },
  { path: 'createcharacter', component: CreateCharacterComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
