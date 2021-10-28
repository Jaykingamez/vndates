import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visual-novel',
  templateUrl: './visual-novel.component.html',
  styleUrls: ['./visual-novel.component.css']
})
export class VisualNovelComponent implements OnInit {
  // change the name that shows on the interface
  static actorName: string = "Ivan Illich";
  // change the image on the interface
  static actorImage: string = "../../assets/images/ruv.png";
  // change the text on the interface
  static content: string = "The name's Ivan Illich. Pleasure to meet you.";

  constructor() { }

  ngOnInit(): void {
  }

  get getActorName(): string{
    return VisualNovelComponent.actorName;
  }

  get getContent(): string{
    return VisualNovelComponent.content;
  }

  get getActorImage(): string{
    return VisualNovelComponent.actorImage;
  }

  set setActorName(name: string){
    VisualNovelComponent.actorName = name;
  }
  
  set setContent(content: string){
    VisualNovelComponent.content = content;
  }

  set setActorImage(src: string){
    VisualNovelComponent.actorImage = src;
  }

  setRuv(){
    VisualNovelComponent.actorImage = "../../assets/images/ruv.png";
  }
}
