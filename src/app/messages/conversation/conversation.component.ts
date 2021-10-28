import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountserviceService } from 'src/app/accountservice.service';
import { Message } from '../message';
import { MessageserviceService } from '../messageservice.service';
import { VisualNovelComponent } from '../../visual-novel/visual-novel.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  log: boolean = false;
  previousMessage: string;
  conversationId: string;
  messages: any = [];
  @ViewChildren('conversation') conversation: QueryList<any>;

  constructor(private route: ActivatedRoute, private messageService: MessageserviceService,
    private accountService: AccountserviceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conversationId = params['id'];
      this.messageService.getMessages(this.conversationId).subscribe(messages => {
        if (messages.length > 0){
          this.messages = messages;
          this.previousMessage = this.messages.slice(-1)[0]["messageText"];
          VisualNovelComponent.actorName = this.messages.slice(-1)[0]["messageUser"];
          VisualNovelComponent.content = this.previousMessage;
          VisualNovelComponent.actorImage = this.accountService.getUserImage('fake', this.messages.slice(-1)[0]["uid"]);
        }
    });
  });
}

ngAfterViewInit() {
  this.conversation.changes.subscribe(() => {
    if (document.getElementById('timestamp' + 0) != null) {
      this.createLog();
    }
  })
}

createLog() {
  for (let i = 0; i < this.messages.length; i++) {
    document.getElementById('timestamp' + i).innerHTML = new Date(this.messages[i]["messageTime"]).toString();
    document.getElementById('messageProfile' + i).setAttribute("src", this.accountService.getUserImage("fake", this.messages[i]["uid"]));
  }
}

sendMessage() {
  console.log("send message");
  this.accountService.getAccount(this.accountService.getSecureToken("AccountId")).subscribe((account) => {
    this.messageService.addMessage(this.conversationId, new Message((<HTMLInputElement>document.getElementById("textMessage")).value,
      new Date().toString(), account["username"], this.accountService.getSecureToken("AccountId")));
    (<HTMLInputElement>document.getElementById("textMessage")).value = '';
  });
}

seeLog() {
  this.log = true;
}

cancelLog() {
  this.log = false;
}

setRuv(integer: number){
  document.getElementById("messageProfile"+ integer).setAttribute("src", "../../assets/images/ruv.png");
}

}

