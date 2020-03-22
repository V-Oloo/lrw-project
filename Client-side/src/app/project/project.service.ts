import { TaskModel } from 'src/app/models/task.model';
import { Status } from './../models/task-status.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Globals } from '../global';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private global: Globals) { }

  addProject(data: Project, customerId: number) {
     return this.http.post(`${environment.apiUrl}/project/${customerId}/addProject`, data);
  }

  getProjectTasks(projectId: number) {
    return this.http.get(`${environment.apiUrl}/project/${projectId}/tasks`)
               .pipe(map((data: any) => data.data), shareReplay(),);


  }

  getProjectTbDetails() {
    return this.http.get(`${environment.apiUrl}/project/projectDetails/stat`)
                    .pipe(map((data: any) => data.data), shareReplay(),);
  }

  updateProject(data: Project, id: number) {
    return this.http.put(`${environment.apiUrl}/project/${id}/update`, data);
  }

  getProject(id: number) {
    return this.http.get(`${environment.apiUrl}/project/${id}`)
                    .pipe(map((data: any) => data.data), shareReplay(),);
  }

  addTask(id:number, data: TaskModel){
    return this.http.post(`${environment.apiUrl}/tasks/${id}/addTask`, data);
  }

  getProjectTaskInfo(id: number) {
     return this.http.get(`${environment.apiUrl}/tasks/project/task/${id}`)
                     .pipe(map((data: any) => data.data), shareReplay(),);
  }

  addComment(taskId : number, data: Comment) {
     return this.http.post(`${environment.apiUrl}/comments/${taskId}/addComment`, data)
  }

  getTaskComments(taskId: number) {
    return this.http.get(`${environment.apiUrl}/comments/task/${taskId}`)
                    .pipe(map((data: any) => data.data), shareReplay(),);
  }

  getEmployeeTasks(empId: number) {
    return this.http.get(`${environment.apiUrl}/tasks/employee/${empId}/tasks`)
                    .pipe(map((data: any) => data.data), shareReplay(),);
  }

  startTask(taskId: number, status: any) {
    return this.http.patch(`${environment.apiUrl}/tasks/${taskId}/status`, status)

  }

  updateStatus(id: number, status: any) {
    return this.http.patch(`${environment.apiUrl}/project/${id}/status`, status);
   }

   updateTask(id: number, data: TaskModel) {
     return this.http.patch(`${environment.apiUrl}/tasks/${id}/update`, data)
   }

}
