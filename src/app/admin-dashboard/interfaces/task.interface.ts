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
    task: Task;
    date_send : Date
}

export interface Task {
    id:           string;
    title:        string;
    description:  string;
    task_created: Date;
    task_open:    Date;
    task_close:   Date;
}
