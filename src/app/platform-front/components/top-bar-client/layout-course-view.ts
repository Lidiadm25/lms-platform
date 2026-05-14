import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserProject } from '../../../auth/interfaces/user.interface';
import { Answer, Survey, SurveyUser } from '../../../projects/interfaces/survey.interface';
import { SurveyService } from '../../../projects/services/SurveyService';
import { SurveyUserService } from '../../../projects/services/SurveyUserService';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { RatingComponent } from '../ratingComponent/ratingComponent';

@Component({
  selector: 'layout-course-view',
  imports: [RouterOutlet, RouterLink, RatingComponent, ReactiveFormsModule],
  templateUrl: './layout-course-view.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCourseView {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  idProject = this.activatedRoute.snapshot.params['idProject'];
  userProjectService = inject(UsersProjectService);
  surveyService = inject(SurveyService);
  surveyUserService = inject(SurveyUserService);

  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);
  survey = signal<Survey | null>(null);
  needsAnswer = signal<boolean>(false);
  fb = inject(FormBuilder);

  courseCompleted() {
    let update: Partial<UserProject>;
    update = {
      end_date: new Date(),
    };
    this.userProjectService.finishCourse(this.idProject, update).subscribe({
      next: (data) => {
        this.checkSurvey();
      },
      error: () => this.hasError.set(true),
    });
  }

  surveyForm!: FormGroup;

  checkSurvey() {
    this.surveyService.findOne(this.idProject).subscribe({
      next: (data) => {
        this.survey.set(data);
        this.surveyForm = this.fb.group({
          rating: this.fb.array(
            this.survey()!.questions.map(() => new FormControl<number | null>(null)),
          ),
        });
        // Verifico que existe una survey
        if (this.survey() != null) {
          this.wasSaved.set(true);

          // Busco si hay respuesta
          this.surveyUserService.findOne(this.survey()!.id as string).subscribe({
            error: (data) => {
              this.needsAnswer.set(true);
              var modal = document.getElementById('surveyModal') as HTMLDialogElement;
              modal.showModal();
            },
          });
        }
      },
      error: () => this.exitPage(),
    });
  }

  exitPage() {
    this.router.navigateByUrl;
  }

  getRatings() {
    return this.surveyForm.get('rating') as FormArray;
  }

  getControl(index: number) {
    return (this.surveyForm.get('rating') as FormArray).at(index) as FormControl;
  }

  createAnswers() {
    var array = this.surveyForm.get('rating')!.value;
    var answers: Answer[] = [];
    for (let index = 0; index < array.length; index++) {
      var answer: Answer = {
        questionsId: this.survey()!.questions[index].id as string,
        rating: array[index] ?? 0,
      };
      answers.push(answer);
    }
    return answers;
  }

  sendAnswers() {
    var answers: Answer[] = this.createAnswers();
    const userAnswer: SurveyUser = {
      surveyId: this.survey()!.id as string,
      answers: answers,
    };
    this.surveyUserService.createSurveySubmit(userAnswer).subscribe((x) => console.log(x));
  }
}
