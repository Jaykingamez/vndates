import { Component, OnInit } from '@angular/core';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';
import { MatchserviceService } from './matchservice.service';

import { AccountserviceService } from '../accountservice.service';

import { MessageserviceService } from '../messages/messageservice.service';
import { Conversation } from '../messages/conversation';
import { Router, ActivatedRoute } from '@angular/router';
import { Match } from './match';
import { Subscriber } from 'rxjs';



@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  altSrc: string = "https://weneedfun.com/wp-content/uploads/2017/06/Anime-Gifs-29.gif";
  // store all matches
  matches: any = [];
  // store the names of matches
  names: string[] = [];
  // store the imageurls of matches
  imageurls: string[] = [];
  // store the ids of matches
  matchIds: string[] = [];
  // store whether user is able to see real profile
  permission: string[] = []
  // checks whether a certain match is selected
  selected: number = null;


  constructor(private matchService: MatchserviceService, private accountService: AccountserviceService,
    private messageService: MessageserviceService, private route: ActivatedRoute, private router: Router) {

    this.getMatches();
  }

  ngOnInit(): void {
  }

  // set the matches, names, imageurls array
  getMatches() {
    this.matchService.getMatches(this.accountService.getSecureToken("AccountId")).subscribe((matches) => {
      this.matches = matches;
      console.log(matches);

      // Add a match when a user has no matches
      if (this.matches.length > 0) {
        VisualNovelComponent.content = "Looks like some people want to match with you. Oh wow.";
      } else {
        this.matchService.addMatch(new Match(this.accountService.getSecureToken("AccountId"))).subscribe((match) => {
          console.log(match);
          // delete match if generated match matches current user with themselves
          if (this.accountService.getSecureToken("AccountId") === match["ops"][0].secondAccountId) {
            this.matchService.deleteMatch(match["ops"][0]._id).subscribe(() => {
              location.reload();
            })
          } else {
            location.reload();
          }
        });
        VisualNovelComponent.content = "No one is interested in you! :)";
      }

      // iterate through the matches, and add usernames and imageurls to their respective arrays
      for (var match of this.matches) {
        // check whether accountId is the same as userId, and add other user details 
        if (match.accountId === this.accountService.getSecureToken("AccountId")) {
          this.accountService.getAccount(match.secondAccountId).subscribe((account) => {
            this.names.push(account["username"]);
            const id = account["_id"];
            this.imageurls.push(this.accountService.getUserImage('fake', id));
            this.matchIds.push(id);
          });
          // only if other user want to show their profile to user
          if (match.secondIdStatus === "real") {
            this.permission.push(match.secondAccountId);
          }
        } else {
          this.accountService.getAccount(match.accountId).subscribe((account) => {
            this.names.push(account["username"]);
            const id = account["_id"];
            this.imageurls.push(this.accountService.getUserImage('fake', id));
            this.matchIds.push(id);
          });
          // only if other user want to show their profile to user
          if (match.firstIdStatus === "real") {
            this.permission.push(match.accountId);
          }
        }
      }
      console.log(this.matchIds);
      // add permissions to session storage as JSON string
      this.accountService.setSecureToken("permission", JSON.stringify(this.permission));
    });
  }

  // show the match that is selected
  showSelection(id: number) {
    console.log(this.selected);
    // if a match is selected
    if (this.selected != null) {
      // remove border
      document.getElementById("matchUser" + this.selected).setAttribute("class", "margin");
    }
    this.selected = id
    // add border
    document.getElementById("matchUser" + id).setAttribute("class", "margin borders");
  }

  // if image source is broken, use the alternate source
  setDefault(number: number) {
    console.log("Hello");
    document.getElementById("matchImage" + number).setAttribute("src", this.altSrc);
  }

  // delete match
  deleteMatch() {
    // remove border
    document.getElementById("matchUser" + this.selected).setAttribute("class", "margin");
    console.log(this.matches[this.selected]["_id"]);
    this.matchService.deleteMatch(this.matches[this.selected]["_id"]).subscribe(results => {
      console.log(results);
      // deselect
      this.selected = null;
      location.reload();
    });
  }

  // adds match as a user to converse with
  converseMatch() {
    this.accountService.getAccount(this.matches[this.selected].accountId).subscribe((account) => {
      this.accountService.getAccount(this.matches[this.selected].secondAccountId).subscribe((account2) => {
        this.messageService.addConversation(account["username"], new Conversation(account2["_id"], account2["username"]));
        this.messageService.addConversation(account2["username"], new Conversation(account["_id"], account["username"]));
      });
    });

    // checks whether accountId is equivalent to user before 
    if (this.accountService.getSecureToken("AccountId") != this.matches[this.selected].accountId) {
      this.router.navigate(['/main/messages/' + this.compareUids(this.matches[this.selected].accountId, this.accountService.getSecureToken("AccountId"))]);
    } else {
      this.router.navigate(['/main/messages/' + this.compareUids(this.matches[this.selected].secondAccountId, this.accountService.getSecureToken("AccountId"))]);
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

  // show real profile to other
  showReal() {
    if (this.matches[this.selected].accountId === this.accountService.getSecureToken("AccountId")) {
      this.matches[this.selected].firstIdStatus = "real";
    } else {
      this.matches[this.selected].secondIdStatus = "real";
    }
    console.log(this.matches[this.selected]);
    this.matchService.updateMatch(this.matches[this.selected]._id, this.matches[this.selected]).subscribe(() => {
      location.reload();
    });
  }
}
