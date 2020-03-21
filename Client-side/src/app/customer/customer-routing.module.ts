import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    data: {
        title: 'Customers List'
    }
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
    data: {
        title: 'Add Customer'
    }
  },
  {
    path: 'update-customer/:id',
    component: UpdateCustomerComponent,
    data: {
        title: 'Update Customer'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
