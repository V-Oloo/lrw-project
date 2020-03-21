import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { error } from 'protractor';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public submitted = false;
  loginForm: FormGroup;
  loading = false;
  public errMessage: string;


  constructor(private fb: FormBuilder, private auth: AuthenticationService, private _router: Router) {}


  loginUser(loginInfo: Login): void {

    this.submitted = true;
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
       this.displayValidationErrors();
       return;
    }

    this.auth.login(loginInfo).subscribe(res => {
      this.loading = false;
      this._router.navigateByUrl('/dashboard');
    },
    error => {
      this.loading = false;
      console.log(error);
      this.errMessage = error.error.message;
    }
    );
  }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
          email: [ null, [ Validators.required , Validators.email] ],
          password: [ null, [ Validators.required ] ]
      });
  }

  displayValidationErrors() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
  }

}
