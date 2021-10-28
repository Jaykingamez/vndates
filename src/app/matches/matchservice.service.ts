import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Match} from './match';

@Injectable({
  providedIn: 'root'
})
export class MatchserviceService {

  // url to communicate with match api
  matchUrl: string = "http://localhost:3000/api/match";

  constructor(private http: HttpClient) { }

  getMatches(accountId: string){
    return this.http.get<any[]>(this.matchUrl + '/' + accountId);
  }

  // create a new match for user
  addMatch(item: Match) {
    return this.http.post<any[]>(this.matchUrl, {
      "accountId": item.accountId
    });
  }

  // change match status
  updateMatch(objectId: string , newItem: Match){
    return this.http.put<any[]>(this.matchUrl + "/" + objectId, {newItem});  
  }

  deleteMatch(objectId: string) {
    return this.http.delete<any[]>(this.matchUrl + "/" + objectId);
  }
}
