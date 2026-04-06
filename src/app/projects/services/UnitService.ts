import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../interfaces/project.interface';
import { map, Observable, switchMap, tap } from 'rxjs';
const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor() {}
  private http = inject(HttpClient);
  
  getById(id: string) {
    return this.http.get<Unit>(`${BASE_URL}/sections/${id}`);
  }


  updateUnit(id: string, lessonLike: Partial<Unit>) {

   
  }

  createUnit(unit:Unit): Observable<Unit>{
    return this.http.post<Unit>(`${BASE_URL}/sections`, unit);
  }

  
}
