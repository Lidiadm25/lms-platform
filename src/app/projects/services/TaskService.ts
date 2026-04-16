import { catchError, map, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { jwtToken } from '../../auth/interfaces/auth-response.interface';
import { Task } from '../interfaces/project.interface';
import { Submit, SubmitTaskResponse, TaskCreate } from '../interfaces/tasks.interface.ts';

const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  constructor() {}

  getById(id: string) {
    return this.http.get<Task>(`${BASE_URL}/tasks/${id}`);
  }
  create(task : TaskCreate){
    task = {
      ...task,
      idProject: "c687c1de-fc3c-4453-a7b1-2ed15bcebc45"
    }
    return this.http.post<TaskCreate>(`${BASE_URL}/tasks`, task)
  }
  update(id: string, task: TaskCreate){
    return this.http.patch<TaskCreate>(`${BASE_URL}/tasks/${id}`, task).pipe
    (
      catchError((error:any) => {return of(false)})
    )
  }
  delete(id:string){
    return this.http.delete(`${BASE_URL}/tasks/${id}`)
  }

  getSubmissions(){
    let token = localStorage.getItem('token')
    if(!token) return;
    let result = jwtDecode<jwtToken>(token);

    return this.http.get<SubmitTaskResponse>(`${BASE_URL}/submit-task/user/${result.id}`)
  }

  getSubmission(id: string){

    return this.http.get<Submit>(`${BASE_URL}/submit-task/${id}`)
  }
  
}
