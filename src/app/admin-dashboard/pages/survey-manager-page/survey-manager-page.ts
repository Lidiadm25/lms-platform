import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SurveyService } from '../../../projects/services/SurveyService';
import { Question } from '../../../projects/interfaces/survey.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-manager-page',
  imports: [ReactiveFormsModule],
  templateUrl: './survey-manager-page.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyManagerPage {
  activatedRoute = inject(ActivatedRoute);
  surveyService = inject(SurveyService);
  projectId = signal<string>('');
  fb = inject(FormBuilder);

  surveyGroup = this.fb.group({
    question1: ['Do you consider the content of this course was hard for you?'],
    question2: ["Do you think you earned new skills from this course?"],
    question3: ["Please evaluate the order of the content and teacher participation"],
    question4: ["What would you change?"],
    question5: ["Overall rating"],
  });

  ngOnInit() {
    this.activatedRoute.parent!.paramMap.subscribe((params) => {
      const lesson = params.get('idProject') ?? '';
      console.log(lesson)
      this.projectId.set(lesson);
    });

  }
  wasSaved = signal<boolean>(false)
  hasError = signal<boolean>(false)
  messageError = signal<string | null>(null)
  onSubmit() {

    const questionsArray: Question[] = Object.keys(this.surveyGroup.value).map((value:string)=>{
      return {title : this.surveyGroup.get(value)? this.surveyGroup.get(value)!.value : ""  }
     })



    const payload = { projectsId: this.projectId(), questions: questionsArray };
    
     
    this.surveyService.createSurvey(payload).subscribe({
      next: (x)=> {
         this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
      },
      error:(error) => {this.messageError.set(error.error.message)
         this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 3000);

      }
    })
  }
}
