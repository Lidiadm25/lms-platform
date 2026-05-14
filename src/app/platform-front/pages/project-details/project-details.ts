import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Project } from '../../../projects/interfaces/project.interface';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../projects/services/ProjectService';
import { map } from 'rxjs';
import { UnitsLessonsAccordeon } from "../../components/units-lessons-accordeon/units-lessons-accordeon";
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { UserProjectCreate } from '../../../auth/interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';
import { jwtToken } from '../../../auth/interfaces/auth-response.interface';

@Component({
  selector: 'app-project-details',
  imports: [UnitsLessonsAccordeon],
  templateUrl: './project-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetails {

  route = inject(ActivatedRoute);
  projectsService = inject(ProjectService);
  usersProject = inject(UsersProjectService)
  idProject = toSignal(this.route.params.pipe(map(({ idProject })=> idProject)))
  project = signal<Project | null>(null)
   lastModified!:string;
  usersNumber = signal<number>(0)

  ngOnInit(){
    this.projectsService.getById(this.idProject()).subscribe({
      next: (data) => {
        this.project.set(data)
        this.lastModified = this.project()!.last_modified.toString()
      }
    })

    this.usersProject.getUsers(this.idProject(), null).subscribe((data)=> this.usersNumber.set(data.count))
  }

  inscription(){
    var token = localStorage.getItem('token');
    if(token != null) {

      let payload = jwtDecode<jwtToken>(token)
   
  const userProjectLike: UserProjectCreate = {
      userId: payload.id,
      projectId: this.idProject(),
    };

    
    this.usersProject.addUser(userProjectLike).subscribe({
      next: (res) => console.log(res),
      error: (res) => console.log(res),
    }); 
  }
  }
 
} 