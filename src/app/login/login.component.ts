import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AccountserviceService } from '../accountservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private accountService: AccountserviceService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login_username: ['', [Validators.required]],
      login_password: ['', [Validators.required]],
    });

    VisualNovelComponent.content = "So who are you?";
  }
  // function to invoke an alert
  onSubmit() {
    // authenticates account
    this.accountService.authAccount(this.loginForm.value.login_username, this.loginForm.value.login_password).subscribe(data => {
      // if user's info is correct
      if (data[0].auth) {
        // add _id under Session Storage
        this.accountService.setSecureToken("AccountId", data[0]["_id"]);
        this.router.navigate(['/main'], { relativeTo: this.route });
      } else {
        console.log("Wrong username or password");
      }
    });
  }

}
