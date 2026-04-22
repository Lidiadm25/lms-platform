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

  create(unit: string, lessonLike: Partial<Lesson>, file: File | undefined) {
    const { maxSize, ...rest } = lessonLike;
    const payload = { ...rest, unit };
    if (!file) {
      return this.http.post<Lesson>(`${BASE_URL}/lessons`, payload);
    }
    return this.uploadFile(file, maxSize).pipe(
      map((fileName) => {
        return {
          ...payload,
          url_file: fileName.substring(40),
        };
      }),
      switchMap((updatedLesson) => this.http.post<Lesson>(`${BASE_URL}/lessons`, updatedLesson)),
    );
  }
  updateLesson(id: string, lessonLike: Partial<Lesson>, file: File | undefined) {
    const { maxSize, ...rest } = lessonLike;

    if (!file) {
      return this.http.patch<Lesson>(`${BASE_URL}/lessons/${id}`, rest);
    }
    return this.uploadFile(file, maxSize).pipe(
      map((fileName) => {
        console.log(fileName);
        return {
          ...rest,
          url_file: fileName.substring(40),
        };
      }),
      switchMap((updatedLesson) =>
        this.http.patch<Lesson>(`${BASE_URL}/lessons/${id}`, updatedLesson),
      ),
    );
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
