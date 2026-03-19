export interface ProjectsResponse {
  count: number;
  pages: number;
  projects: Project[];

}

export interface Project {
    id:          string;
    title:       string;
    description: string;
    duration:    number;
    image: string;
    studentsCount: number;
}


