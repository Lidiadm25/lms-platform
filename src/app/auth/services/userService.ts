import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private http = inject(HttpClient);

  getUsersEmails(query:string, projectId:string):Observable<User[]>{
    return this.http.get<User[]>(`${baseUrl}/auth/email/${query}/${projectId}`);
  }
}
