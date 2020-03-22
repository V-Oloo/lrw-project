import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {

  customersList: [];
  search : any;

  constructor(
    private message: NzMessageService,
    private customerServise: CustomerService
    ) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.customerServise.getCustomers().subscribe(res => {
      this.customersList = res;
      console.log("this is my project")
      console.log(this.customersList);
    });
  }

  deactivateCustomer(id: number) {
    this.customerServise.updateStatus(id, {status : "INACTIVE"}).subscribe((res) => {
      this.message.create('success', `Customer Deactivated`);
      window.location.reload()
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }

  activateCustomer(id: number) {
    this.customerServise.updateStatus(id, {status : "ACTIVE"}).subscribe((res) => {
      this.message.create('success', `Customer Activated`);
      window.location.reload()
    }, (error) => {
      this.message.create('error', `operation Unsucceeful, try again`);
    });
  }



}
