import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
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
  dialog = inject(MatDialog);

  events = signal<EventInput[]>([]);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    height: 650,
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  taskService = inject(TaskService);
  // todo toggle calendar visible
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit() {
    // recoger tareas del user
    this.taskService.getSubmissions()?.subscribe((result) => {
      this.events.set(DateEventMapper.mapSubmitToEvent(result));

      this.calendarOptions.events = this.events();
      this.cd.detectChanges();
    });
  }
  // todo  copy of the object, make your change, and then reassign it.

  handleEventClick(clickInfo: EventClickArg) {
    this.dialog.open(DialogEvents, {
      data: {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        lesson_id: clickInfo.event.extendedProps['lesson_task'],
        task_id: clickInfo.event.extendedProps['task_id'],
      },
    });
  }
}
