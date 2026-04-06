import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Project, ProjectsResponse } from '../interfaces/project.interface';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
  category?: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  private http = inject(HttpClient);

  getProjects(options: Options): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(`${BASE_URL}/project`, {
      params: {
        ...options,
      },
    });
  }

  getFilteredProjects(options: Options, query: string): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(`${BASE_URL}/project/search/${query}`, {
      params: {
        ...options,
      },
    });
  }

  getById(id: string) {
    
    return this.http.get<Project>(`${BASE_URL}/project/${id}`);
  }

  // Update

  updateProject(id: string, project: Partial<Project>, imageFile?:File) {
    console.log(project)
    const currentImages = project.image ?? [];
    if (!imageFile) {
    return this.http.patch<Project>(`${BASE_URL}/project/${id}`, project);
    }
   return this.uploadImage(imageFile).pipe(
    map((fileName) => {
      console.log('fileName:', fileName);

      return {
        ...project,
        image: fileName.substring(40)   
      };
    }),
    switchMap((updatedProject) =>
      this.http.patch<Project>(`${BASE_URL}/project/${id}`, updatedProject)
    )
  );
}

   

  uploadImage(imageFile: File) : Observable<string> {
    console.log("entra")
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http.post<{
      secureUrl:string
    }>(`${BASE_URL}/files/project`, formData)
    .pipe(
      map((resp) => resp.secureUrl),
      tap((imageNames)=> console.log({imageNames}))
    );
  }

  createProject(project: Project, imageFile:File):Observable<Project>{
   
   
   return this.uploadImage(imageFile).pipe(
    map((fileName) => {
      console.log('fileName:', fileName);

      return {
        ...project,
        image: fileName.substring(40)   
      };
    }),
    switchMap((updatedProject) =>
      this.http.post<Project>(`${BASE_URL}/project/`, updatedProject)
    )
  );
}

}
