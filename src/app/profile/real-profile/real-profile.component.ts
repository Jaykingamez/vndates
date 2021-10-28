import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VisualNovelComponent } from '../../visual-novel/visual-novel.component';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AccountserviceService } from '../../accountservice.service';
import { Profile } from '../../profile';


@Component({
  selector: 'app-real-profile',
  templateUrl: './real-profile.component.html',
  styleUrls: ['./real-profile.component.css']
})
export class RealProfileComponent implements OnInit {

  realProfileForm: FormGroup;
  realProfile: Profile;
  fileToUpload: File | null = null;
  // id of current user
  userId: string;
  // id of current profile
  accountId: string;
  // image url of profile image of current profile
  imageurl: string;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private accountService: AccountserviceService) {
    const routeParams = this.route.snapshot.paramMap;
    this.accountId = routeParams.get('accountId');
    this.userId = accountService.getSecureToken("AccountId");
  }

  ngOnInit(): void {
    this.realProfileForm = this.fb.group({
      realName: ['', [Validators.required]],
      realAge: ['', [Validators.required, Validators.min(0)]],
      realGender: ['', [Validators.required]],
      realLocation: ['', [Validators.required]],
      realTagline: ['', [Validators.required, Validators.maxLength(50)]],
      realDescription: ['', [Validators.required, Validators.maxLength(300)]],
      realPhoto: '',
    });

    // if user is not signing up a new account, get current user's information
    if (this.accountId != null) {
      this.imageurl = this.accountService.getUserImage('real', this.accountId);
      this.accountService.getAccount(this.accountId).subscribe((account) => {
        this.realProfileForm.patchValue({
          realName: account["realProfile"]["realName"],
          realAge: account["realProfile"]["realAge"],
          realGender: account["realProfile"]["realGender"],
          realLocation: account["realProfile"]["realLocation"],
          realTagline: account["realProfile"]["realTagline"],
          realDescription: account["realProfile"]["realDescription"],
        });
      });

      document.getElementById("realPhotoDisplay").setAttribute("src", this.imageurl);
    }

    VisualNovelComponent.content = "So who are you really?";
  }

  // set image to upload and display image
  showImage(files: FileList) {
    this.fileToUpload = files.item(0);
    document.getElementById("realPhotoDisplay").setAttribute("src", URL.createObjectURL(this.fileToUpload));
  }

  //update profile information
  onSubmit() {
    let profile = new Profile(this.realProfileForm.value.realName, this.realProfileForm.value.realAge,
      this.realProfileForm.value.realLocation, this.realProfileForm.value.realTagline, this.realProfileForm.value.realDescription,
      this.realProfileForm.value.realGender);

    if (this.fileToUpload != null) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      this.accountService.uploadPhoto(formData, 'real' + this.accountService.getSecureToken("AccountId"));
    }

    this.accountService.updateRealProfile(profile, this.accountService.getSecureToken("AccountId"));

    // add account Id as parameter if user is not new and is just looking at the profile information they have inputted
    if (this.accountId != null) {
      this.router.navigate(['/main/profile/fake' + '/' + this.accountId])
    } else {
      this.router.navigate(['/main/profile/fake']);
    }

  }





}
