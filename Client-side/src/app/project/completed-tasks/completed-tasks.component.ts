import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import * as _ from 'lodash'
import { ExportService } from 'src/app/shared/services/export.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styles: []
})
export class CompletedTasksComponent implements OnInit {

  constructor(private service: ProjectService, private exportService: ExportService, private fb: FormBuilder, private datePipe: DatePipe) { }

  tasks: [];
  taskArr: [];
  search : any;

  validateForm: FormGroup;

  ngOnInit(): void {
    this.service.getCompletedTasks().subscribe(res => {
         this.tasks = res.data;
         this.newArrays();
         console.log( this.tasks)
    })

    this.validateForm = this.fb.group({
      toDate: [null, [Validators.required]],
      fromDate: [null, [Validators.required]],
  });
  }

  submitForm() {
    const fromDate = this.datePipe.transform(this.validateForm.value.fromDate, 'yyyy-MM-dd');
    const toDate = this.datePipe.transform(this.validateForm.value.toDate, 'yyyy-MM-dd');
     console.log(this.validateForm.value)
    this.service.getCompletedTasks(fromDate,toDate).subscribe(res => {
      this.tasks = res.data;
      this.newArrays();
      console.log( this.tasks)
 })
  }

  newArrays() {
    let arr = this.tasks;

    let newArr = _.map(arr, function(value,element) {

     let start = value.starTime;
     let end = value.endTime;
     // var time = ((new Date(end).getHours()) - (new Date(start).getHours()))
     let street = value.street;
     let city = value.city;
     let state = value.state;
     let zip = value.zip;
     let address = street + ',' + city + ' ' + state + ' ' + zip;
     let actual = value.atime;
     let time = actual/60;

     return _.extend({address: address, bill: value.bill, btime: value.btime, ftime: value.ftime, atime: time, review: value.review,
      start:value.startime,end:value.endtime,name:value.name,hours: time, project:value.project, customer:value.customer}, element);
     });

     this.taskArr = newArr;
  }

  export() {
    this.exportService.exportExcel(this.taskArr, 'completed_tasks');
  }


}
