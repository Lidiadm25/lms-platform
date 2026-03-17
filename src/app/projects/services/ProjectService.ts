import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { RESTProject } from '../interfaces/rest-project.interface';
import { environment } from '../../../environments/environment';
import { ProjectMapper } from '../mappers/project.mapper';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  private http = inject(HttpClient)

  getProjects():Observable<Project[]>{
    return this.http.get<RESTProject[]>(`${BASE_URL}/project`).pipe
    (
      map(restProjects => ProjectMapper.mapperToProjectArray(restProjects)),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('Couldnt get any info'))
      })
    )
  }

}
