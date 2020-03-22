import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styles: []
})
export class AddCustomerComponent implements OnInit {

  CustomerForm: FormGroup;
  loading = false;
  public errMessage: string;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private message: NzMessageService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.CustomerForm = this.fb.group({
      organization: [null, [Validators.required]],
      contactPerson: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      phonePrefix: ['+1' , [Validators.required]],
      street: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],

  });

  }

  addCustomer(data: Customer) {

    if (this.CustomerForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    this.loading = true;
    this.customerService.addCustomer(data).subscribe((res:any) => {

      this.loading = false;
      this.message.create('success', `Employee added successfully`);
      this.router.navigate(['/customers']);
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    }
    );
  }

  displayValidationErrors() {
    for (const i in this.CustomerForm.controls) {
      this.CustomerForm.controls[ i ].markAsDirty();
      this.CustomerForm.controls[ i ].updateValueAndValidity();
    }
  }
}
