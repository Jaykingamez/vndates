import { Component, OnInit } from '@angular/core';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {
    // set the Visual Novel elements up
    VisualNovelComponent.actorImage = "assets/images/ruv.png";
    VisualNovelComponent.actorName = "Ivan Illich";
  }

}
