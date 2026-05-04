export interface Grade {
    min_range: number;
    max_range:number;
    total: number;
    feedback:string;
    taskSubmitted:string;
}

export interface GradeTask {
  grades_total:            number;
  grades_min_range:        number;
  grades_max_range:        number;
  grades_feedback:         string;
  taskSubmitted_id:        string;
  tasks_title:             string;


}