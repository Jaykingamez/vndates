import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VisualNovelComponent } from './visual-novel/visual-novel.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HeaderComponent } from './header/header.component';
import { MatchesComponent } from './matches/matches.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { TalkComponent } from './talk/talk.component';
import { RealProfileComponent } from './profile/real-profile/real-profile.component';
import { FakeProfileComponent } from './profile/fake-profile/fake-profile.component';

import { AccountserviceService } from './accountservice.service';
import { ConversationComponent } from './messages/conversation/conversation.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    VisualNovelComponent,
    MainpageComponent,
    HeaderComponent,
    MatchesComponent,
    MessagesComponent,
    ProfileComponent,
    TalkComponent,
    RealProfileComponent,
    FakeProfileComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AccountserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
