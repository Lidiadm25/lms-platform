import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Survey } from "../interfaces/survey.interface";
import { HttpClient } from "@angular/common/http";

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})

export class SurveyService {

   private http = inject(HttpClient);
    createSurvey(payload: Survey){
      return  this.http.post<Survey>(`${BASE_URL}/survey`, payload)
    }
}
