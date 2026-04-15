import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CoursesSlider } from "../../components/courses-slider/courses-slider";
import { UsersProjectService } from '../../../projects/services/UsersProjectService';

@Component({
  selector: 'app-home-page',
  imports: [CoursesSlider],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { 
  
}
