import { Component, OnInit } from '@angular/core';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // setup Visual Novel elements
    VisualNovelComponent.content = "Welcome back. Let's hope you have some matches.";
    VisualNovelComponent.actorImage = "../../assets/images/ruv.png";
    VisualNovelComponent.actorName = "Ivan Illich";
  }

}
