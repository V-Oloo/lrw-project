import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styles: []
})
export class CompletedTasksComponent implements OnInit {

  constructor(private service: ProjectService) { }

  tasks: [];
  taskArr: [];
  search : any;

  ngOnInit(): void {
    this.service.getCompletedTasks().subscribe(res => {
         this.tasks = res;
        // console.log(res)
         this.newArrays();
    })
  }

  newArrays() {
    let arr = this.tasks;

    let newArr = _.map(arr, function(value,element) {

     let start = value.starTime;
     let end = value.endTime;
     var time = ((new Date(end).getHours()) - (new Date(start).getHours()))

     return _.extend({task:value.task_name,
      start:value.starTime,end:value.endTime,name:value.name,hours: time, project:value.project, customer:value.customer}, element);
     });

     this.taskArr = newArr;
     console.log(this.taskArr);
  }



}
