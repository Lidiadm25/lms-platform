import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core/index.js';
import { TaskService } from '../../../projects/services/TaskService';
import { DateEventMapper } from '../../../projects/mappers/dateEvent.mapper';
import { DialogEvents } from '../../../shared/components/dialog-events/dialogEvents';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-calendar-page',
  imports: [FullCalendarModule],
  templateUrl: './calendar-page.html',
 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPage {  dialog = inject(MatDialog);

  events = signal<EventInput[]>([]);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    
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