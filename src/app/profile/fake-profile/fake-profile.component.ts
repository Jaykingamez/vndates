import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VisualNovelComponent } from '../../visual-novel/visual-novel.component';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AccountserviceService } from '../../accountservice.service';
import { Profile } from '../../profile';

@Component({
  selector: 'app-fake-profile',
  templateUrl: './fake-profile.component.html',
  styleUrls: ['./fake-profile.component.css']
})
export class FakeProfileComponent implements OnInit {

  fakeProfileForm: FormGroup;
  fakeProfile: Profile;
  fileToUpload: File | null = null;
  // id of current user
  userId: string;
  // id of current profile
  accountId: string;
  // image url of profile image of current profile
  imageurl: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private accountService: AccountserviceService) {
    const routeParams = this.route.snapshot.paramMap;
    this.accountId = routeParams.get('accountId');
    this.userId = accountService.getSecureToken("AccountId");
  }

  ngOnInit(): void {
    this.fakeProfileForm = this.fb.group({
      fakeName: ['', [Validators.required]],
      fakeAge: ['', [Validators.required, Validators.min(0)]],
      fakeGender: ['', [Validators.required]],
      fakeLocation: ['', [Validators.required]],
      fakeTagline: ['', [Validators.required, Validators.maxLength(50)]],
      fakeDescription: ['', [Validators.required, Validators.maxLength(300)]],
      fakePhoto: '',
    });

    // if user is not signing up a new account, get current user's information
    if (this.accountId != null) {
      this.imageurl = this.accountService.getUserImage('fake', this.accountId);
      this.accountService.getAccount(this.accountId).subscribe((account) => {
        this.fakeProfileForm.patchValue({
          fakeName: account["fakeProfile"]["fakeName"],
          fakeAge: account["fakeProfile"]["fakeAge"],
          fakeGender: account["fakeProfile"]["fakeGender"],
          fakeLocation: account["fakeProfile"]["fakeLocation"],
          fakeTagline: account["fakeProfile"]["fakeTagline"],
          fakeDescription: account["fakeProfile"]["fakeDescription"],
        });
      });
      document.getElementById("fakePhotoDisplay").setAttribute("src", this.imageurl);
    }
    VisualNovelComponent.content = "A bunch of lies. Liar.";
  }

  // set image to upload and display image
  showImage(files: FileList) {
    this.fileToUpload = files.item(0);
    document.getElementById("fakePhotoDisplay").setAttribute("src", URL.createObjectURL(this.fileToUpload));
  }

  //update profile information
  onSubmit() {
    let profile = new Profile(this.fakeProfileForm.value.fakeName, this.fakeProfileForm.value.fakeAge,
      this.fakeProfileForm.value.fakeLocation, this.fakeProfileForm.value.fakeTagline,
      this.fakeProfileForm.value.fakeDescription, this.fakeProfileForm.value.fakeGender)
    this.accountService.updateFakeProfile(profile, this.accountService.getSecureToken("AccountId"));

    if (this.fileToUpload != null) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      this.accountService.uploadPhoto(formData, 'fake' + this.accountService.getSecureToken("AccountId"));
    }

    this.router.navigate(['/', 'main']);
  }
  

}
