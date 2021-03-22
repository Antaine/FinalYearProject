import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
//Import pages to create route
import { CreateCharacterComponent } from './create-character/create-character.component';
import { ForumsComponent } from './forums/forums.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { SocialComponent } from './social/social.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

//Routes to Navigate to Pages
const routes: Routes = [
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent },
  { path: 'createcharacter', component: CreateCharacterComponent },
  { path: 'forum', component: ForumsComponent },
  { path: 'social', component: SocialComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent},
  { path: 'messaging', component: MessagingComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { AuthGuard } from "./auth.guard";

