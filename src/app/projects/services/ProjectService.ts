import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { FullProjectRespose, Project, ProjectsResponse } from '../interfaces/project.interface';
import { RESTProject } from '../interfaces/rest-project.interface';
import { environment } from '../../../environments/environment';
import { ProjectMapper } from '../mappers/project.mapper';

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
    
    return this.http.get<FullProjectRespose>(`${BASE_URL}/project/${id}`);
  }

  // Update

  updateProject(id: string, project: Partial<FullProjectRespose>, file :File|undefined) {

    const image = project.image ?? null;
    if(file != undefined){
      
   
    return this.uploadImage(file).pipe(
      switchMap((updatedProject) => this.http.patch<FullProjectRespose>(`${BASE_URL}/project/${id}`, project))
    )
     }
     return this.http.patch<FullProjectRespose>(`${BASE_URL}/project/${id}`, project) ;


  }

  uploadImage(imageFile: File) : Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<{
      fileName:string
    }>(`${BASE_URL}/files/project`, formData)
    .pipe(map((resp) => resp.fileName));
  }

}
