import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FullProjectRespose, Lesson } from '../interfaces/project.interface';
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

  updateLesson(id: string, lessonLike: Partial<Lesson>, file: File |undefined) {


    const currentFiles = lessonLike.url_file ?? [];

    if (!file) {
      return this.http.patch<Lesson>(`${BASE_URL}/lessons/${id}`, lessonLike);
    }

    return this.uploadFile(file).pipe(
      map((fileName)=>{
        return {
          ...lessonLike,
          url_file: fileName.substring(40)
        };
      }),
      switchMap((updatedLesson) => this.http.patch<Lesson>(`${BASE_URL}/lessons/${id}`, updatedLesson))
    )
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<{
        secureUrl: string;
      }>(`${BASE_URL}/files/project`, formData)
      .pipe(
        map((resp) => resp.secureUrl),
        tap((imageNames) => console.log({ imageNames })),
      );
  }
}
