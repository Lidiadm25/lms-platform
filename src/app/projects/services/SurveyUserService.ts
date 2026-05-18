import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { datasetQuestion, datasetSurvey, SurveyUser } from '../interfaces/survey.interface';


const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class SurveyUserService {

   private http = inject(HttpClient);
    createSurveySubmit(payload: SurveyUser){
      return  this.http.post<SurveyUser>(`${BASE_URL}/survey-user`, payload)
    }

    findOne(id:string){
      return this.http.get<SurveyUser>(`${BASE_URL}/survey/${id}`)
    }

  getAvgFromSurvey(){
    return this.http.get<datasetSurvey[]>(`${BASE_URL}/survey-user/avg`)
  }

  getSpecificAvg(id:string){
    return this.http.get<number>(`${BASE_URL}/survey-user/${id}/avg`)
  }
   // QUESTIONS

    getQuestionsAvg(id:string){
      return this.http.get<datasetQuestion[]>(`${BASE_URL}/question/${id}/avg`)
    }
}
