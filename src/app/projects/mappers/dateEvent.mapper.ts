import { EventInput } from "@fullcalendar/core/index.js";
import { SubmitTaskResponse } from "../interfaces/tasks.interface";
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
export class DateEventMapper{

    static mapSubmitToEvent(submitItem: SubmitTaskResponse): EventInput[]{
        let events : EventInput[] = []
       for (let index = 0; index < submitItem.tasks.length; index++) {      
            events.push({
                id: submitItem.tasks[index].id,
                title: submitItem.tasks[index].task.title, 
                start:new Date( submitItem.tasks[index].task.task_open),
                end: new Date( submitItem.tasks[index].task.task_close),
                lesson_task: submitItem.tasks[index].task.lesson_task.id,
                task_id: submitItem.tasks[index].task.id

            })
        
            
       }
       
       return events;

    }
}