

import { User } from '../../auth/interfaces/user.interface';


export interface ProjectsResponse {
  count: number;
  pages: number;
  projects: Project[];
}


export interface Project {
  id: string;
  title: string;
  image: string;
  category: Category;
  description: string;
  duration: number;
  units: Unit[];
  isActive: boolean;
  author: User;
  studentsCount: number;
}

export interface Unit {
  project: Project;
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  section: string;
  id: string;
  url_file: null;
  title: string;
  description: string;
  maxSize?: string;
  tasks: Task[];
}


export interface Category {
  id: string;
  name: string;
}
export interface Task {

    id:           string;
    lesson_task: Lesson;
    title:        string;
    description:  string;
    task_created: Date;
    task_open:    Date;
    task_close:   Date;
}

export interface Tree {
  lesson_id:           string;
  lesson_url_file:     string;
  lesson_title:        string;
  lesson_description:  string;
  lesson_unitId:       string;
  section_id:          string;
  section_title:       string;
  section_description: string;
  section_projectId:   string;
  project_id:          string;
  project_title:       string;
  project_image:       string;
  project_description: string;
  project_duration:    number;
  project_isActive:    number;
  project_authorId:    string;
  project_categoryId:  string;
  project_surveyId:    string;
}








