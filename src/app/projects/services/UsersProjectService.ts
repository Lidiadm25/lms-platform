import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsersProjectResponse } from '../../auth/interfaces/user.interface';


const BASE_URL = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
}
@Injectable({
  providedIn: 'root'
})
export class UsersProjectService {

  constructor() { }
private http = inject(HttpClient)

getUsers(id:string, options:Options):Observable<UsersProjectResponse>{
    const  {limit = 10, offset = 0} = options;
    return this.http.get<UsersProjectResponse>(`${BASE_URL}/user-projects/${id}`, {
      params: {
        limit,
        offset
      },
    });
  }
}
