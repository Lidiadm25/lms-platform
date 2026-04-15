import { Component, inject, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateEventMapper } from '../../../projects/mappers/dateEvent.mapper';
import { TaskService } from '../../../projects/services/TaskService';
import { CoursesSlider } from "../../components/courses-slider/courses-slider";

@Component({
  selector: 'app-home-page',
  imports: [CoursesSlider, FullCalendarModule],
  templateUrl: './home-page.html',
})
export class HomePage { 
  


  events = signal<EventInput[]>([]);

   calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    height: 650,
    events: []
    
  };
  taskService = inject(TaskService)
   
  ngOnInit() {
    // recoger tareas del user
    this.taskService.getSubmissions()?.subscribe((result)=> {
      this.events.set(DateEventMapper.mapSubmitToEvent(result))
      this.calendarOptions.events = this.events()
    })
  }
}
