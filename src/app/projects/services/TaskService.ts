import { catchError, map, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/project.interface';
import { TaskCreate } from '../../admin-dashboard/interfaces/task.interface';

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

  
  
}
