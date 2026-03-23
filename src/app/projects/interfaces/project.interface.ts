import { User } from "./rest-project.interface";

export interface ProjectsResponse {
  count: number;
  pages: number;
  projects: Project[];

}

export interface FullProjectRespose{
  id:          string;
  title:       string;
  image:       string;
  description: string;
  duration:    number;
  units:       Unit[];
  author: User;
}


export interface Project {
    id:          string;
    title:       string;
    description: string;
    duration:    number;
    image: string;
    studentsCount: number;
}

export interface Unit {
  id:          string;
  title:       string;
  description: string;
  lessons:     Lesson[];
}

export interface Lesson {
  id:       string;
  url_file: null;
  title:    string;
}

