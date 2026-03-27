import { AuthService } from './../../../auth/services/authService';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FullProjectResponse, Project } from '../../interfaces/project.interface';
import { RouterLink } from '@angular/router';

import { UsersProjectService } from '../../services/UsersProjectService';
import { User, UserProject, UserProjectCreate } from '../../../auth/interfaces/user.interface';


@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<FullProjectResponse>();
  imageUrl = computed(() => {
    const nombre = this.project().image;
    return nombre? `http://localhost:3000/api/files/project/${this.project().image}` : 'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg' ;
  });

  
  userProjectService = inject(UsersProjectService);
  authService = inject(AuthService);
  user!: User;

  inscription(id: string) {
    if (this.authService.user() !== null) {
      this.user = this.authService.user() as User;
    }
    const userProjectLike: UserProjectCreate = {
      userId: this.user.id,
      projectId: id,
    };

    this.userProjectService.addUser(userProjectLike).subscribe({
      next: (res) => console.log(res),
      error: (res) => console.log(res),
    });
  }
}
