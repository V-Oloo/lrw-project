import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styles: []
})
export class UpdateCustomerComponent implements OnInit {
  CustomerForm: FormGroup;
  loading = false;
  public errMessage: string;

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private message: NzMessageService,
    private _route: ActivatedRoute,
    private router: Router) { }

    id = +this._route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.customerService.getCustomer(this.id).subscribe((res) => {
       this.editCustomer(res.data);
    });
    this.CustomerForm = this.fb.group({
      organization: [null, [Validators.required]],
      contactPerson: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      phonePrefix: ['+1' , [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  editCustomer (data: Customer) {
    this.CustomerForm.patchValue({
      organization: data.organization,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      phonePrefix: data.phonePrefix,
      address: data.address,
    });
  }

  updateCustomer(data: Customer) {

    if (this.CustomerForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    this.customerService.updateCustomer(data, this.id).subscribe((res:any) => {
      this.loading = false;
      this.loading = false;
      this.message.create('success', `Customer Updated successfully`);
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
