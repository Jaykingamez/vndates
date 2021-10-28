import { Component, OnInit } from '@angular/core';
import { AccountserviceService } from '../accountservice.service';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // id of current user
  accountId: string;
  // name of user
  name: string;
  // imageurl image profile of user
  imageurl: string;

  constructor(private accountService: AccountserviceService) { 
    this.accountId = accountService.getSecureToken("AccountId");
    accountService.getAccount(this.accountId).subscribe((account) => {
      this.name = account["username"];
    });
    this.imageurl = accountService.getUserImage('real', this.accountId);
  }

  ngOnInit(): void {
    VisualNovelComponent.content = "Here's you. Hope you put something good to look at.";
  }
}
