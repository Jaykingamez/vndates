import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountserviceService {

  // updating of account information
  accountUrl: string = "http://localhost:3000/api/account";
  // authenticate account
  authUrl: string = "http://localhost:3000/api/auth";
  // update fakeProfile
  fakeProfileUrl: string = "http://localhost:3000/api/fakeProfile/";
  // update realProfile
  realProfileUrl: string = "http://localhost:3000/api/realProfile/";
  // stores and retrieves images
  photoUrl: string = "http://localhost:3000/api/image/"


  constructor(private http: HttpClient) { }
  
  getUserImage(realOrFake: string, accountId: string) {
    return this.photoUrl + realOrFake + accountId;
  }

  getAccount(accountId){
    return this.http.get<any[]>(this.accountUrl + '/' + accountId);
  }

  //add account: username, password, email
  addAccount(username: string, password: string, email: string) {
    return this.http.post<any[]>(this.accountUrl, { 'username': username, 'password': password, 'email': email });
  }

  updateFakeProfile(fakeProfile: Profile, account_id: string) {
    this.http.put<any[]>(this.fakeProfileUrl + account_id, {
      'fakeName': fakeProfile.name,
      'fakeAge': fakeProfile.age,
      'fakeLocation': fakeProfile.location,
      'fakeTagline': fakeProfile.tagline,
      'fakeDescription': fakeProfile.description,
      'fakeGender': fakeProfile.gender,
    }).subscribe((value) => {
      console.log(value);
    });;
  }

  updateRealProfile(realProfile: Profile, account_id) {
    console.log(this.realProfileUrl + account_id);
    this.http.put<any[]>(this.realProfileUrl + account_id, {
      'realName': realProfile.name,
      'realAge': realProfile.age,
      'realLocation': realProfile.location,
      'realTagline': realProfile.tagline,
      'realDescription': realProfile.description,
      'realGender': realProfile.gender,
    }).subscribe((value) => {
      console.log(value);
    });
  }

  uploadPhoto(formData: FormData, fileName: string){
    return this.http.post<any[]>(this.photoUrl + fileName, formData).subscribe(
      (val) => console.log(val),
      (err) => console.error(err)
    );
  }

  getPhoto(filename: string){
    return this.http.get<any[]>(this.photoUrl+ filename).subscribe(
      (val) => console.log(val),
      (err) => console.error(err)
    );
  }

  authAccount(username: string, password: string) {
    return this.http.post<any[]>(this.authUrl, { 'username': username, 'password': password });
  }

  setSecureToken(key: string, secure_token: string) {
    sessionStorage.setItem(key, secure_token)
  }

  getSecureToken(key: string) {
    return sessionStorage.getItem(key);
  }
  
  logout() {
    sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("permission");
  }
}
