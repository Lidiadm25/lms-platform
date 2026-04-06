import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../interfaces/project.interface';
import { Observable } from 'rxjs';
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

  updateUnit(unitLike: Unit) {
    console.log(unitLike);
    let id = unitLike.id;
    console.log(id);
    return this.http.patch<Unit>(`${BASE_URL}/sections/${id}`, unitLike);
  }

  createUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${BASE_URL}/sections`, unit);
  }
}
