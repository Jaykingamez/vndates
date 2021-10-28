import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';
import { AccountserviceService } from '../accountservice.service';
import { MessageserviceService } from './messageservice.service';
import { Conversation } from './conversation';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // stores reference to HTML element that store the conversations
  @ViewChildren('conversations') conversations: QueryList<any>;
  // id of user
  currentUid: string;
  names: string[] = [];
  imageurls: string[] = [];
  conversationList: Conversation[] = [];
  // alternate imageSrc for users lacking profile images
  altSrc: string = "https://weneedfun.com/wp-content/uploads/2017/06/Anime-Gifs-29.gif"


  constructor(private accountService: AccountserviceService, private messageService: MessageserviceService) {
    // set current user id 
    this.currentUid = accountService.getSecureToken("AccountId");

    // set conversationList, names
    this.accountService.getAccount(this.accountService.getSecureToken("AccountId")).subscribe((account) => {
      this.messageService.getConversations(account["username"]).subscribe((conversations) => {
        console.log(conversations);
        this.conversationList = conversations;

        if (this.conversationList.length > 0) {
          VisualNovelComponent.content = "Looks like some people want to talk to you. Oh wow.";
        } else {
          VisualNovelComponent.content = "No one wants to talk to you,hah!"
        }
        VisualNovelComponent.actorImage = "../../assets/images/ruv.png";
        VisualNovelComponent.actorName = "Ivan Illich";

        for (var conversation of this.conversationList) {
          this.names.push(conversation["username"]);
        }
      });
    });


  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // if there are any changes in conversations
    this.conversations.changes.subscribe(() => {
      this.parseConversations();
    })
  }

  // parse conversations
  parseConversations() {
    for (let i = 0; i < this.conversationList.length; i++) {
      console.log(this.conversationList[i]["uid"]);
      // disply image
      document.getElementById("conversationImage" + i).setAttribute("src", this.accountService.getUserImage("fake", this.conversationList[i]["uid"]));
    }
  }

  // creating conversationId out of the Ids
  compareUids(firstUid: string, secondUid: string): string {
    if (firstUid.localeCompare(secondUid) < 0) {
      return firstUid + '_' + secondUid;
    } else {
      return secondUid + '_' + firstUid;
    }
  }

  // Display alternative image if user does not have a profile image
  setDefault(number: number) {
    console.log("Hello");
    document.getElementById("conversationImage" + number).setAttribute("src", this.altSrc);
  }

  

}
