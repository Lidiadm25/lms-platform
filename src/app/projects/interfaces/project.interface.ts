import { User } from "../../auth/interfaces/user.interface";


export interface ProjectsResponse {
  count: number;
  pages: number;
  projects: Project[];

}
/*
export interface FullProjectResponse{
  id:          string;
  title:       string;
  image:       string;
  category:    string
  description: string;
  duration:    number;
  units:       Unit[];
  author: User;
} */

// quitar
export interface Project {
  id:          string;
  title:       string;
  image:       string;
  category:    string
  description: string;
  duration:    number;
  units:       Unit[];
  isActive: boolean;
  author: User;
  studentsCount: number;
}

export interface Unit {
  project :    string;
  id:          string;
  title:       string;
  description: string;
  lessons:     Lesson[];
}

export interface Lesson {
  section: string
  id:       string;
  url_file: null;
  title:    string;
  description: string;
  maxSize?:string;
}

export interface Category {
  id: string;
  name: string;
}