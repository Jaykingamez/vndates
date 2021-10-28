import { Component, OnInit } from '@angular/core';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css']
})
export class TalkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    VisualNovelComponent.content = "You must be very bored clicking here, let's talk then. Tell me about all your problems.";
  }

}
