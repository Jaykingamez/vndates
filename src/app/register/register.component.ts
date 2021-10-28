import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VisualNovelComponent } from '../visual-novel/visual-novel.component';
import { passwordMatchValidator } from './custom.validator';
import { AccountserviceService } from '../accountservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private accountService: AccountserviceService ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      register_username: ['', [Validators.required]],
      register_email: ['', [Validators.required, Validators.email]],
      pwSet: this.fb.group ({
        // regex that checks for a psssword that contains 1 symbol, 1 uppercase and 1 lowercase character
        register_password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\W)/)]],
        register_confirm_password: ['', [Validators.required]]
      }, {validators: passwordMatchValidator})
    });

    VisualNovelComponent.content = "Glad to see you back.";
  }
  
  // when the user completes registration
  onSubmit() {
    this.accountService.addAccount(this.registerForm.value.register_username, this.registerForm.get('pwSet.register_password').value,
      this.registerForm.value.register_email).subscribe((account)=>{
        // add their Id into Session Storage
        sessionStorage.setItem("AccountId", account[0]["_id"]);
        // navigate to get real profile information
        this.router.navigate(['/main/profile/real'], { relativeTo: this.route });
      })
  }
}

