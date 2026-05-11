import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SurveyUser } from '../interfaces/survey-user.interface';

const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class SurveyUserService {

   private http = inject(HttpClient);
    createSurvey(payload: SurveyUser){
      return  this.http.post<SurveyUser>(`${BASE_URL}/survey`, payload)
    }

    findOne(id:string){
      return this.http.get<SurveyUser>(`${BASE_URL}/survey/${id}`)
    }
}
