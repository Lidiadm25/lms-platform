import { Project } from "../../projects/interfaces/project.interface";

export interface User {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
}

export interface UsersProjectResponse {
  count: number;
  pages: number;
  total: number;
  users: UserProject[];

}

export interface UserProject{
    id: string;
    user:User;
    project:Project;
    start_date:Date;
    end_date:Date;
}

export interface UserProjectCreate {
    userId?: string;
    projectId:string;
    userEmail?:string;
}

export interface UserProjectsResponse {
  count: number;
  pages: number;
  total: number;
  projects: UserProject[];

}