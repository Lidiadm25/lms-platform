import { AuthService } from './../../../auth/services/authService';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Project } from '../../interfaces/project.interface';
import { RouterLink } from "@angular/router";

import { UsersProjectService } from '../../services/UsersProjectService';
import { UserProject, UserProjectCreate } from '../../../auth/interfaces/user.interface';
import { User } from '../../interfaces/rest-project.interface';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
    project = input.required<Project>();
    image = "https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg"
    userProjectService = inject(UsersProjectService);
    authService = inject(AuthService); 
    user!:User ;



  

    inscription(id:string){
       if(this.authService.user() !== null){
        this.user = this.authService.user() as User ;
       }
    const userProjectLike:UserProjectCreate = {
      userId: this.user.id,
      projectId: id,
    }
     console.log(userProjectLike)
        this.userProjectService.addUser(userProjectLike).subscribe({
          next: res => console.log(res),
          error: res => console.log(res)
        });
      
      
    }
 }
