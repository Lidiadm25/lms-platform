import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtToken } from '../../auth/interfaces/auth-response.interface';
import {
  UserProjectCreate,
  UserProjectsResponse,
  UsersProjectResponse,
} from '../../auth/interfaces/user.interface';
import { UserProject } from './../../auth/interfaces/user.interface';

const BASE_URL = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
}
@Injectable({
  providedIn: 'root',
})
export class UsersProjectService {
  constructor() {}
  private http = inject(HttpClient);

  getUsers(id: string, options: Options | null): Observable<UsersProjectResponse> {
    return this.http.get<UsersProjectResponse>(`${BASE_URL}/user-projects/${id}`, {
      params: {
        ...options,
      },
    });
  }

  finishCourse(idProject: string, dto: Partial<UserProject>) {
    return this.http.patch<UserProject>(
      `${BASE_URL}/user-projects/project/${idProject}/finish`,
      dto,
    );
  }

  getAll(id: string) {
    return this.http.get<UserProject[]>(`${BASE_URL}/user-projects/project/${id}`);
  }

  addUser(userProjectLike: UserProjectCreate): Observable<UserProject> {
    return this.http.post<UserProject>(`${BASE_URL}/user-projects`, userProjectLike);
  }

  addUsers(userProjectLike: UserProjectCreate[]): Observable<UserProject> {
    return this.http.post<UserProject>(`${BASE_URL}/user-projects/bulk`, {
      users: userProjectLike,
    });
  }

  removeUsers(userProjectLike: string[]) {
    return this.http.request<UserProject>('DELETE', BASE_URL + '/user-projects/bulk', {
      body: userProjectLike,
    });
  }

  getProjects() {
    let token = localStorage.getItem('token');
    if (!token) return;
    let decoded = jwtDecode<jwtToken>(token);

    return this.http.get<UserProjectsResponse>(`${BASE_URL}/user-projects/projects/${decoded.id}`);
  }
}
