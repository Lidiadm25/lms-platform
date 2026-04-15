import { EventInput } from "@fullcalendar/core/index.js";
import { Submit, SubmitTaskResponse } from "../../admin-dashboard/interfaces/task.interface";
import { Task } from "../interfaces/project.interface";
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
export class DateEventMapper{

    static mapSubmitToEvent(submitItem: SubmitTaskResponse): EventInput[]{
        let events : EventInput[] = []
       for (let index = 0; index < submitItem.tasks.length; index++) {
            events.push({
                id: submitItem.tasks[index].id,
                title: submitItem.tasks[index].id,
                start: TODAY_STR + 'T12:00:00',
                end: TODAY_STR + 'T15:00:00'

            })
        
       }
       return events;

    }
}