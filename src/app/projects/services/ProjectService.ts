import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Project, ProjectsResponse } from '../interfaces/project.interface';
import { RESTProject } from '../interfaces/rest-project.interface';
import { environment } from '../../../environments/environment';
import { ProjectMapper } from '../mappers/project.mapper';

const BASE_URL = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  private http = inject(HttpClient)

  getProjects(options: Options):Observable<ProjectsResponse>{
    const  {limit = 10, offset = 0} = options;
    return this.http.get<ProjectsResponse>(`${BASE_URL}/project`, {
      params: {
        limit,
        offset
      }
    });
  }

}
