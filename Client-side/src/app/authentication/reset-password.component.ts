import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  public submitted = false;
  ResetPassForm: FormGroup;
  loading = false;
  public errMessage: string;
  ResetSuccessShow = false;


  constructor(private fb: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.ResetPassForm = this.fb.group({
        email: [ null, [ Validators.required , Validators.email] ],
    });
  }


  resetPassword(): void {

    this.submitted = true;
    this.loading = true;
    if (this. ResetPassForm.invalid) {
      this.loading = false;
       this.displayValidationErrors();
       return;
    }

    this.auth.resetPassword(this.ResetPassForm.value).subscribe(res => {
      this.loading = false;
      this.ResetSuccessShow = true;
    },
    error => {
      this.loading = false;
      console.log(error);
      this.errMessage = error.error.message;
    }
    );
  }

  displayValidationErrors() {
    for (const i in this.ResetPassForm.controls) {
      this.ResetPassForm.controls[ i ].markAsDirty();
      this.ResetPassForm.controls[ i ].updateValueAndValidity();
    }
  }

}
