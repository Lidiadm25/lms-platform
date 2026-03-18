export interface ProjectsResponse {
  count: number;
  pages: number;
  projectsWithStudents: Project[];

}

export interface Project {
    id:          string;
    title:       string;
    description: string;
    duration:    number;
    image: string;
    studentsCount: number;
}


