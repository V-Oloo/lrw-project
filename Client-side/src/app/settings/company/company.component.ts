import { SettingsService } from './../settings.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  SmtpConfigForm: FormGroup;
  CompanyForm: FormGroup;
  public employee: any;
  loading = false;
  public errMessage: string;

  constructor(
    private setting: SettingsService,
    private message: NzMessageService,
    private fb: FormBuilder,
    ) { }

  companyId = 1
  ngOnInit(): void {

    this.setting.getCompany(this.companyId).subscribe((res:any)=> {
      this.editCompany(res);
    });

    this.CompanyForm = this.fb.group({
      organization: [null, [Validators.required]],
      contact_person: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      cone_rate: [null, [Validators.required]],
      flagger_rate: [null, [Validators.required]],
      sign_rate: [null, [Validators.required]],
      boards_rate: [null, [Validators.required]],
      min_hours: [null, [Validators.required]]
    });

  }

  updateCompany() {

    const data = this.CompanyForm.value;

    if (this.CompanyForm.invalid) {
      this.displayValidationErrors();
      return;
    }
    console.log(this.CompanyForm.value);
    this.loading = true
    this.setting.updateCompany(data, this.companyId).subscribe((res:any) => {
      this.loading = false;
      this.message.create('success', `project updated successfully`);
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    }
    );

  }

  editCompany (data: any) {
    this.CompanyForm.patchValue({
      organization: data.organization,
      contact_person: data.contact_person,
      startDate: data.startDate,
      endDate: data.endDate,
      phone: data.phone,
      email: data.email,
      address: data.address,
      cone_rate: data.cone_rate,
      flagger_rate: data.flagger_rate,
      sign_rate: data.sign_rate,
      boards_rate: data.boards_rate,
      min_hours: data.min_hours,
    });
  }

  displayValidationErrors() {
    for (const i in this.CompanyForm.controls) {
      this.CompanyForm.controls[ i ].markAsDirty();
      this.CompanyForm.controls[ i ].updateValueAndValidity();
    }
  }

}
