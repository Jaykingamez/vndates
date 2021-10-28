import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AccountserviceService } from '../accountservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, private accountService: AccountserviceService) { }

  ngOnInit(): void {
  }
  
  // Logs the user out
  logout(){
    this.accountService.logout();
  }

}
