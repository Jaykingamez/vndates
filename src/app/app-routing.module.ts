import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VisualNovelComponent } from './visual-novel/visual-novel.component';

import { MainpageComponent } from './mainpage/mainpage.component';
import { MatchesComponent } from './matches/matches.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { TalkComponent } from './talk/talk.component';
import { RealProfileComponent } from './profile/real-profile/real-profile.component';
import { FakeProfileComponent } from './profile/fake-profile/fake-profile.component';
import { ConversationComponent } from './messages/conversation/conversation.component';
import { AuthGuard } from './auth.guard';
import { RealProfileGuard } from './real-profile.guard';

// handles routes while also using an authguard to ensure unauthorised users can't enter
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'main', component: MainpageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/matches', component: MatchesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/messages', component: MessagesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/messages/:id', component: ConversationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/profile/real', component: RealProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/profile/real/:accountId', component: RealProfileComponent, canActivate: [AuthGuard, RealProfileGuard]
  },
  {
    path: 'main/profile/fake', component: FakeProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/profile/fake/:accountId', component: FakeProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'main/talk', component: TalkComponent, canActivate: [AuthGuard]
  },
  {
    path: '', component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(routes);
