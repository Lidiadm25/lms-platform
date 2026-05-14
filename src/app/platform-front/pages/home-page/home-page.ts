import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CoursesSlider } from '../../components/courses-slider/courses-slider';

@Component({
  selector: 'app-home-page',
  imports: [CoursesSlider, FullCalendarModule],
  templateUrl: './home-page.html',
})
export class HomePage {
 
}
