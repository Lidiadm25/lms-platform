export interface TaskCreate{
    title: string;
    description: string;
    lessonId: string;
    task_open: string;
    task_close: string;
    idProject: string;
}

export interface SubmitTaskResponse{
    tasks: Submit[];
    count: number;
}

export interface Submit {
    id:string;
    date_send : Date
}