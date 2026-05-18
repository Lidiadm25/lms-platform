import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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
  projectLoaded = signal<Project | null>(null);

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
    return this.http
      .get<Project>(`${BASE_URL}/project/${id}`)
      .pipe(tap((resp) => this.projectLoaded.set(resp)));
  }

  // Update

  updateProject(id: string, project: any, imageFile?: File) {
    const formData = new FormData();

    if (project) {
      Object.keys(project).forEach((key) => {
        formData.append(key, String(project[key]));
      });
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.patch<Project>(`${BASE_URL}/project/${id}`, formData);
  }



  createProject(project: any, imageFile?: File) {
    const formData = new FormData();

    if (project) {
      Object.keys(project).forEach((key) => {
        formData.append(key, String(project[key]));
      });
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Project>(`${BASE_URL}/project`, formData);
  }

  delete(id: string) {
    return this.http.delete(`${BASE_URL}/project/${id}`);
  }
}
