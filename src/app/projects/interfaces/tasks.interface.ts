import {Task } from "./project.interface";


export interface TaskCreate{
    title: string;
    description: string;
    lessonId: string;
    task_open: string;
    task_close: string;
    idProject: string;
    fileSize: number;
}

export interface  SubmitTaskResponse{
    tasks: Submit[];
    count: number;
}

export interface Submit {
    id:string;
    url_file:string[];
    task: Task;
    date_send : Date
}


