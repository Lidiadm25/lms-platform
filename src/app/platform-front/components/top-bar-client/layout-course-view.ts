import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserProject } from '../../../auth/interfaces/user.interface';
import { Survey } from '../../../projects/interfaces/survey.interface';
import { SurveyService } from '../../../projects/services/SurveyService';
import { SurveyUserService } from '../../../projects/services/SurveyUserService';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { RatingComponent } from "../ratingComponent/ratingComponent";

@Component({
  selector: 'layout-course-view',
  imports: [RouterOutlet, RouterLink, RatingComponent],
  templateUrl: './layout-course-view.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCourseView {
  activatedRoute = inject(ActivatedRoute);
  idProject = this.activatedRoute.snapshot.params['idProject'];
  userProjectService = inject(UsersProjectService);
  surveyService = inject(SurveyService);
  surveyUserService = inject(SurveyUserService);

  wasSaved = signal<boolean>(false);
  hasError = signal<boolean>(false);
  survey = signal<Survey | null>(null);
  needsAnswer = signal<boolean>(false);

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

  checkSurvey() {
    var modal = document.getElementById('surveyModal') as HTMLDialogElement;

    this.surveyService.findOne(this.idProject).subscribe((data) => {
      this.survey.set(data);
      console.log(this.survey());
      if (this.survey() != null) {
        this.surveyUserService.findOne(this.survey()!.id as string).subscribe({
          error: (data) => {
            modal.showModal();
          },
        });
      }
    });
  }
}
