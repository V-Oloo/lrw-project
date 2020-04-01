import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import * as _ from 'lodash'
import { ExportService } from 'src/app/shared/services/export.service';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styles: []
})
export class CompletedTasksComponent implements OnInit {

  constructor(private service: ProjectService, private exportService: ExportService) { }

  tasks: [];
  taskArr: [];
  search : any;

  ngOnInit(): void {
    this.service.getCompletedTasks().subscribe(res => {
         this.tasks = res.data;
         this.newArrays();
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
