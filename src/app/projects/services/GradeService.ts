import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Grade } from '../interfaces/grade.interface';
const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(){}
 private http = inject(HttpClient);

 create(grade: Grade){
  
  return this.http.post<Grade>(`${BASE_URL}/grade`, grade);
 }

 getGradeFromSubmit(id:string){
  return this.http.get<Grade>(`${BASE_URL}/grade/submit/${id}`)
 }
}
