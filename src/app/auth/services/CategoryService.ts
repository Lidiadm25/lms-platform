import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../projects/interfaces/project.interface';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  private http = inject(HttpClient);
  
  getCategories(){
    return this.http.get<Category[]>(`${baseUrl}/category`)
  }
}
