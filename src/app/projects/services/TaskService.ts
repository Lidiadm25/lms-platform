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
      idProject: "c687c1de-fc3c-4453-a7b1-2ed15bcebc45"
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
  
 updateSubmission(id: string, files: File[], idTask: string) {
  const formData = new FormData();
  
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    formData.append('documents', file, file.name);
  }

  return this.http.post<string[]>(`${BASE_URL}/files/bulk/${idTask}`, formData).pipe(
    
    switchMap(response => {
      console.log(response)
      const payload = {url_file: response};
      console.log(payload)
      return this.http.patch(`${BASE_URL}/submit-task/${id}`, payload);
    })
  );
}

    uploadFiles(files:File[]): Observable<string[]>{
      if(!files) return of([])

        const uploadObservables = Array.from(files).map((file)=> this.uploadFile(file, undefined));
        return forkJoin(uploadObservables).pipe(
          tap((fileNames)=> console.log({fileNames}))
        )
    }


    uploadFile(file: File, size: string | undefined): Observable<string> {
      const formData = new FormData();
      formData.append('file', file);
      if (size == undefined) size = 'DEFAULT';
      formData.append('maxSize', size);
      return this.http
        .post<{
          secureUrl: string;
        }>(`${BASE_URL}/files/lesson`, formData)
        .pipe(
          map((resp) => resp.secureUrl),
          tap((imageNames) => console.log({ imageNames })),
        );
    }


    findByUserTask(id:string, task:string){
     return this.http.get<Submit>(`${BASE_URL}/submit-task/review-task/${id}/${task}`)
    }

    
}
