import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../interfaces/project.interface';
import { AuthService } from './../../../auth/services/authService';

import { User, UserProjectCreate } from '../../../auth/interfaces/user.interface';
import { UsersProjectService } from '../../services/UsersProjectService';


@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<Project>();
  in = input<boolean>(false);
  router = inject(Router)
  imageUrl = computed(() => {
    const nombre = this.project().image;
    return nombre? `http://localhost:3000/api/files/project/${this.project().image}` : 'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg' ;
  });

  
  userProjectService = inject(UsersProjectService);
  authService = inject(AuthService);
  user!: User;

  // todo hacer decode de jwt en vez de esta mierda
  inscription(id: string) {
    if (this.authService.user() !== null) {
      this.user = this.authService.user() as User;
    }
    

  }


  navigateToPage(){
    if(this.in()== true){
      this.router.navigateByUrl(
        "/course/"+ this.project().id
      )
    } else{
      this.router.navigateByUrl('/project-details/' + this.project().id)
    }
  }
}
