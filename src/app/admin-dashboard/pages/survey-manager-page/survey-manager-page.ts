import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-survey-manager-page',
  imports: [],
  templateUrl: './survey-manager-page.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyManagerPage { 
  fb = inject(FormBuilder)

  surveyGroup = this.fb.group({
    description: [],
    type: [],
  })

 
}
