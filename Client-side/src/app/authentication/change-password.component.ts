import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '../shared/pipes/password-validator';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: []
})
export class ChangePasswordComponent implements OnInit {
  public submitted = false;
  passwordCreationForm: FormGroup;
  loading = false;
  public errMessage: string;
  urlParams: any = {};


  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private _router: Router,
    private route: ActivatedRoute,
    ) {}


  setPassword(): void {

    this.submitted = true;
    this.loading = true;
    if (this.passwordCreationForm.invalid) {
      this.loading = false;
       this.displayValidationErrors();
       return;
    }

    const data = this.passwordCreationForm.value;

    this.auth.passwordReset(this.urlParams.userId, {password: data.newPassword}).subscribe(res => {
      this.loading = false;
      this._router.navigateByUrl('/authentication/login');
    },
    error => {
      this.loading = false;
      console.log(error);
      this.errMessage = error.error.message;
    }
    );
  }

  ngOnInit(): void {
    this.urlParams.userId = +this.route.snapshot.queryParamMap.get('userId');
    this.passwordCreationForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', [Validators.required]],
    }, { validator: MustMatch('newPassword', 'confirmPass')});
  }

  displayValidationErrors() {
    for (const i in this.passwordCreationForm.controls) {
      this.passwordCreationForm.controls[ i ].markAsDirty();
      this.passwordCreationForm.controls[ i ].updateValueAndValidity();
    }
  }

}
