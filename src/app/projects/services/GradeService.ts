import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Grade, GradeTask } from '../interfaces/grade.interface';

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

 getGradesFromProject(id:string){

  return this.http.get<GradeTask[]>(`${BASE_URL}/grade/${id}`)
 }

 getGradeFromSubmit(id:string){
  return this.http.get<Grade>(`${BASE_URL}/grade/submit/${id}`)
 }
}
