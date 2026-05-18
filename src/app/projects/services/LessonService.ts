import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lesson, LessonResponse, Tree } from '../interfaces/project.interface';
import { map, Observable, switchMap, tap } from 'rxjs';
const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor() {}
  private http = inject(HttpClient);

  getById(id: string) {
    return this.http.get<Lesson>(`${BASE_URL}/lessons/${id}`);
  }

  create(unit: string, lessonLike: any, file: File[]) {
     const formData = new FormData();
   
       if (lessonLike) {
         Object.keys(lessonLike).forEach((key) => {
           formData.append(key, String(lessonLike[key]));
         });
         formData.append("unit",unit)
       }
   
       if (file && file.length > 0) {
          file.forEach(element => {
            formData.append("files", element)
          });
       }
   
       return this.http.post<Lesson>(`${BASE_URL}/lessons`, formData);
  }
  updateLesson(id: string, lessonLike: any, file: File[]) {
    const formData = new FormData();
   
       if (lessonLike) {
         Object.keys(lessonLike).forEach((key) => {
           formData.append(key, String(lessonLike[key]));
         });
       }
   
       if (file && file.length > 0) {
          file.forEach(element => {
            formData.append("files", element)
          });
       }
   
       return this.http.patch<Lesson>(`${BASE_URL}/lessons/${id}`, formData);

    
   
  }

  uploadFile(fsize: string | undefined): Observable<string> {
    const formData = new FormData();
    // formData.append('file', file);
    // if (size == undefined) size = 'DEFAULT';
    // formData.append('maxSize', size);
    return this.http
      .post<{
        secureUrl: string;
      }>(`${BASE_URL}/files/lesson`, formData)
      .pipe(
        map((resp) => resp.secureUrl),
        tap((imageNames) => console.log({ imageNames })),
      );
  }

  delete(id: string) {
    return this.http.delete(`${BASE_URL}/lessons/${id}`);
  }

  getTree(id:string){
    return this.http.get<Tree>(`${BASE_URL}/lessons/tree/${id}`);
  }

  getLessonsByUnit(id:string){

    return this.http.get<Lesson[]>(`${BASE_URL}/lessons/unit-id/${id}`)
  }
}
