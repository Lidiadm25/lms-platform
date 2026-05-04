import { AuthService } from './../../../auth/services/authService';
import { ChangeDetectorRef, Component, computed, inject, Signal, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateEventMapper } from '../../../projects/mappers/dateEvent.mapper';
import { TaskService } from '../../../projects/services/TaskService';
import { DialogEvents } from '../../../shared/components/dialog-events/dialogEvents';
import { CoursesSlider } from '../../components/courses-slider/courses-slider';

@Component({
  selector: 'app-home-page',
  imports: [CoursesSlider, FullCalendarModule],
  templateUrl: './home-page.html',
})
export class HomePage {
 
}
