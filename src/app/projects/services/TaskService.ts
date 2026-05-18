import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtToken } from '../../auth/interfaces/auth-response.interface';
import { Task } from '../interfaces/project.interface';
import { Submit, SubmitTaskResponse, TaskCreate } from '../interfaces/tasks.interface';


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
      idProject: task.idProject
    }
    return this.http.post<TaskCreate>(`${BASE_URL}/tasks`, task)
  }
  update(id: string, task: TaskCreate){
    return this.http.patch<TaskCreate>(`${BASE_URL}/tasks/${id}`, task)
  }
  delete(id:string){
    return this.http.delete(`${BASE_URL}/tasks/${id}`)
  }

  getByLessonId(id:string){
    
    return this.http.get<Task[]>(`${BASE_URL}/tasks/lesson-id/${id}`)
  }

  // SUBMISSIONS REQ

  getSubmissions(){
    let token = localStorage.getItem('token')
    if(!token) return;
    let result = jwtDecode<jwtToken>(token);

    return this.http.get<SubmitTaskResponse>(`${BASE_URL}/submit-task/user/${result.id}`)
  }

  getSubmission(id: string){

    return this.http.get<Submit>(`${BASE_URL}/submit-task/${id}`)
  }

  getSubmissionByTask(id: string){

    return this.http.get<Submit>(`${BASE_URL}/submit-task/task/${id}`)
  }
  
 updateSubmission(id: string, files: File[]) {
  const formData = new FormData();
  
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    formData.append('files', file);
  }

  return this.http.patch<Submit>(`${BASE_URL}/submit-task/${id}`, formData)
 
}

   
    

    findByUserTask(id:string, task:string){
     return this.http.get<Submit>(`${BASE_URL}/submit-task/review-task/${id}/${task}`)
    }

    
}
