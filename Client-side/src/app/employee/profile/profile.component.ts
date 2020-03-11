import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Registration } from 'src/app/models/registration.model';
import { AuthService } from 'src/app/authentication/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/shared/pipes/password-validator';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  changePWForm: FormGroup;
  RegistrationForm: FormGroup;
  public employee: any;
  loading = false;
  public errMessage: string;

  fname; lname; email; role; location; phone

  currentUser = this.auth.currentUserValue;
  userId = +this.currentUser.user_id;


  constructor(private fb: FormBuilder,
     private empService: EmployeeService,
     private auth: AuthService,
     private message: NzMessageService,
     private router: Router
     ) {

   }

  ngOnInit() {

    this.empService.getEmployee(this.userId).subscribe((res: any) => {
      this.employee = res.data;
      this.editEmployee(res.data);
      // user information

      this.fname = this.employee.firstname;
      this.lname = this.employee.lastname;
      this.email = this.employee.email;
      this.location = this.employee.address;
      this.phone = this.employee.phone;
      this.role = this.employee.jobTitle;
    })
    this.changePWForm = this.fb.group({
      oldPassword: [ null, [ Validators.required ] ],
      newPassword: [ null, [ Validators.required ] ],
      confirmPassword: [ null, [ Validators.required ] ]
  },{ validator: MustMatch('newPassword', 'confirmPassword')});

  this.RegistrationForm = this.fb.group({
    firstname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required]],
    phonePrefix: ['+1' , [Validators.required]],
    jobTitle: [null, [Validators.required]],
    department: [null, [Validators.required]],
    address: [null, [Validators.required]],
  });
  }

  editEmployee (data: Registration) {
    // console.log(data);
    this.RegistrationForm.patchValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      phonePrefix: data.phonePrefix,
      jobTitle: data.jobTitle,
      department: data.department,
      address: data.address,
    });
  }

  updateEmployeeDetails(data: Registration) {

    if (this.changePWForm.invalid) {
      this.loading = false;
       this.displayValidationErrors();
       return;
    }

    this.loading = true;
    this.empService.updateEmpDetails(data, this.userId).subscribe((res: any) => {
      this.loading = false;
      this.message.create('success', `employee updated successfully`);
    }, (err: any) => {
      this.loading = false;
      this.errMessage = err.error.message;
    });
  }

  displayValidationErrors() {
    for (const i in this.RegistrationForm.controls) {
      this.RegistrationForm.controls[ i ].markAsDirty();
      this.RegistrationForm.controls[ i ].updateValueAndValidity();
    }
  }

  displayChangePassValidationErrors(): void {
    for (const i in this.changePWForm.controls) {
      this.changePWForm.controls[ i ].markAsDirty();
      this.changePWForm.controls[ i ].updateValueAndValidity();
     }
  }

  changePassword() {

    if (this.changePWForm.invalid) {
      this.loading = false;
       this.displayChangePassValidationErrors();
       return;
    }
    this.loading =  true;
    const data = this.changePWForm.value;
    this.empService.changePassword({oldPassword: data.oldPassword, newPassword: data.newPassword}, this.userId)
                   .subscribe((res: any) => {
                    this.loading = false;
                    this.message.create('success', `password updated successfully, please login in`);
                    this.router.navigate(['/authentication/login']);
                   },
                   (error) => {
                    this.loading = false;
                    this.errMessage = error.error.message;
                   }
                   );
  }

}
