import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserProject } from '../../../auth/interfaces/user.interface';
import { Survey } from '../../../projects/interfaces/survey.interface';
import { SurveyService } from '../../../projects/services/SurveyService';
import { SurveyUserService } from '../../../projects/services/SurveyUserService';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { RatingComponent } from "../ratingComponent/ratingComponent";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'layout-course-view',
  imports: [RouterOutlet, RouterLink, RatingComponent, ReactiveFormsModule],
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
  fb = inject(FormBuilder)



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

  surveyForm !: FormGroup;
 
  checkSurvey() {
    

    this.surveyService.findOne(this.idProject).subscribe((data) => {
      this.survey.set(data);
      this.surveyForm = this.fb.group({
       rating :  this.fb.array(
     this.survey()!.questions.map(() => new FormControl<number | null>(null))
  )
 })
      if (this.survey() != null) {
         this.wasSaved.set(true)
         var modal = document.getElementById('surveyModal') as HTMLDialogElement;
        this.surveyUserService.findOne(this.survey()!.id as string).subscribe({
          error: (data) => {
            modal.showModal();
          },
        });
       
      }
    });
  }

  getRatings(){
    return this.surveyForm.get('rating') as FormArray
  }

  getControl(index: number){
    return (this.surveyForm.get('rating') as FormArray).at(index) as FormControl
  }

  getAvgRating(){
    var total = 0;
    var array =  this.surveyForm.get('rating')!.value
    
    for (let index = 0; index <array.length; index++) {
      var rating = array[index];
      if(rating==null)
      {
        rating=0;
      }
      total += rating;
    }
    return total;
  }


  sendAnswers(){
  var  rating : number  = this.getAvgRating()
  // TODO post con user service
  // TODO post del response
    //this.surveyUserService

  }
}
