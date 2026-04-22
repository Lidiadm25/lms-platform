import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GradeCreate } from '../interfaces/grade.interface';
const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(){}
 private http = inject(HttpClient);

 create(grade: GradeCreate){
  
  return this.http.post<GradeCreate>(`${BASE_URL}/grade`, grade);
 }
}
